"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdminCredentials = validateAdminCredentials;
exports.issueAdminToken = issueAdminToken;
exports.requireAdminAuth = requireAdminAuth;
const crypto_1 = __importDefault(require("crypto"));
function getAdminConfig() {
    return {
        username: (process.env.ADMIN_USERNAME || "admin").trim(),
        password: (process.env.ADMIN_PASSWORD || "").trim(),
        token: (process.env.ADMIN_TOKEN || "").trim(),
    };
}
function validateAdminCredentials(username, password) {
    const { username: adminUsername, password: adminPassword } = getAdminConfig();
    const normalizedUsername = username.trim();
    const normalizedPassword = password.trim();
    if (!adminPassword)
        return false;
    if (normalizedUsername !== adminUsername)
        return false;
    const a = Buffer.from(normalizedPassword);
    const b = Buffer.from(adminPassword);
    if (a.length !== b.length)
        return false;
    return crypto_1.default.timingSafeEqual(a, b);
}
function issueAdminToken() {
    const { username, password, token } = getAdminConfig();
    if (token)
        return token;
    const seed = `${username}:${password}`;
    return crypto_1.default.createHash("sha256").update(seed).digest("hex");
}
function requireAdminAuth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    const validToken = issueAdminToken();
    if (!token) {
        res.status(401).json({ message: "Missing admin token" });
        return;
    }
    const a = Buffer.from(token);
    const b = Buffer.from(validToken);
    if (a.length !== b.length || !crypto_1.default.timingSafeEqual(a, b)) {
        res.status(401).json({ message: "Invalid admin token" });
        return;
    }
    next();
}
