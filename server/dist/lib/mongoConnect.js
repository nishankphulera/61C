"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferIpv4Dns = preferIpv4Dns;
exports.expandMongoSrvToTcpUri = expandMongoSrvToTcpUri;
exports.isLikelySrvDnsFailure = isLikelySrvDnsFailure;
const promises_1 = __importDefault(require("node:dns/promises"));
const node_util_1 = require("node:util");
const node_dns_1 = require("node:dns");
const mongodb_connection_string_url_1 = require("mongodb-connection-string-url");
/** Prefer IPv4 when resolving hostnames (helps some dual-stack / Atlas setups). */
function preferIpv4Dns() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const nodeDns = require("node:dns");
        if (typeof nodeDns.setDefaultResultOrder === "function") {
            nodeDns.setDefaultResultOrder("ipv4first");
        }
    }
    catch {
        /* ignore */
    }
}
function customDnsServers() {
    const raw = process.env.MONGO_DNS_SERVERS?.trim();
    if (!raw)
        return undefined;
    const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
    return list.length ? list : undefined;
}
async function resolveSrv(fqdn) {
    const servers = customDnsServers();
    if (servers?.length) {
        const res = new node_dns_1.Resolver();
        res.setServers(servers);
        return await (0, node_util_1.promisify)(res.resolveSrv.bind(res))(fqdn);
    }
    return promises_1.default.resolveSrv(fqdn);
}
async function resolveTxt(fqdn) {
    const servers = customDnsServers();
    try {
        if (servers?.length) {
            const res = new node_dns_1.Resolver();
            res.setServers(servers);
            return await (0, node_util_1.promisify)(res.resolveTxt.bind(res))(fqdn);
        }
        return await promises_1.default.resolveTxt(fqdn);
    }
    catch {
        return undefined;
    }
}
function mergeTxtIntoUriSearch(searchFromUri, txtJoined) {
    const out = new URLSearchParams(txtJoined);
    const q = searchFromUri.startsWith("?") ? searchFromUri.slice(1) : searchFromUri;
    const orig = new URLSearchParams(q);
    for (const [k, v] of orig) {
        out.set(k, v);
    }
    const s = out.toString();
    return s ? `?${s}` : "";
}
/**
 * Expand `mongodb+srv://…` to `mongodb://host1:27017,…` using Node DNS (optionally
 * `MONGO_DNS_SERVERS`, comma-separated) so we avoid the driver's first SRV hop when it fails.
 */
async function expandMongoSrvToTcpUri(srvUri) {
    const cs = new mongodb_connection_string_url_1.ConnectionString(srvUri);
    if (!cs.isSRV)
        return srvUri;
    const seed = cs.hosts[0];
    const fqdn = `_mongodb._tcp.${seed}`;
    const srvRecords = await resolveSrv(fqdn);
    const hostList = srvRecords.map((r) => `${r.name}:${r.port}`).join(",");
    let search = cs.search;
    const txtRows = await resolveTxt(fqdn);
    if (txtRows?.[0]?.length) {
        const txtJoined = txtRows[0].join("");
        search = mergeTxtIntoUriSearch(search, txtJoined);
    }
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    if (!params.has("tls") && !params.has("ssl")) {
        params.set("tls", "true");
    }
    const searchFinal = params.toString() ? `?${params.toString()}` : "";
    const user = cs.username;
    const pass = cs.password;
    const auth = user || pass ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@` : "";
    const path = cs.pathname === "" ? "/" : cs.pathname;
    return `mongodb://${auth}${hostList}${path}${searchFinal}`;
}
function isLikelySrvDnsFailure(err) {
    const msg = err instanceof Error ? err.message : String(err);
    return (msg.includes("querySrv") ||
        msg.includes("ECONNREFUSED") ||
        msg.includes("ENOTFOUND") ||
        msg.includes("ESERVFAIL"));
}
