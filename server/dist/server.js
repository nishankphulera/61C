"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const publicRoutes_1 = __importDefault(require("./routes/publicRoutes"));
const mongoConnect_1 = require("./lib/mongoConnect");
dotenv_1.default.config();
(0, mongoConnect_1.preferIpv4Dns)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);
const localDevOrigins = ["http://localhost:3000", "http://localhost:3001"];
const CLIENT_ORIGINS = Array.from(new Set(process.env.NODE_ENV === "production"
    ? configuredOrigins.length
        ? configuredOrigins
        : localDevOrigins
    : [...configuredOrigins, ...localDevOrigins]));
if (process.env.NODE_ENV === "production" && configuredOrigins.length === 0) {
    console.warn("CLIENT_ORIGIN is empty: production CORS only allows http://localhost:3000 and :3001. " +
        "Set CLIENT_ORIGIN on the server (e.g. https://www.61cstudios.com,https://61cstudios.com).");
}
// Middleware — use a static origin list so disallowed browsers get a normal preflight (204)
// instead of 500 (the `cors` package treats `callback(Error)` as a server error).
app.use((0, cors_1.default)({
    origin: CLIENT_ORIGINS,
}));
app.use(express_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/public", publicRoutes_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    if (res.headersSent)
        return;
    const message = err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ message });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("Public routes: GET /api/public/content, POST /api/public/contact");
});
if (!MONGO_URI.trim()) {
    console.warn("MongoDB URI missing; starting API without DB connection.");
    mongoose_1.default.set("bufferCommands", false);
}
else {
    const mongoOptions = { family: 4 };
    void (async () => {
        let connectUri = MONGO_URI;
        if (MONGO_URI.startsWith("mongodb+srv://")) {
            try {
                connectUri = await (0, mongoConnect_1.expandMongoSrvToTcpUri)(MONGO_URI);
                console.log("Resolved mongodb+srv to mongodb:// host list in Node (avoids driver querySrv).");
            }
            catch (expandErr) {
                console.warn("Could not expand SRV in Node DNS; falling back to driver SRV resolution.", expandErr instanceof Error ? expandErr.message : expandErr);
                connectUri = MONGO_URI;
            }
        }
        try {
            await mongoose_1.default.connect(connectUri, mongoOptions);
            console.log("MongoDB connected ✅");
        }
        catch (err) {
            const srv = MONGO_URI.startsWith("mongodb+srv://");
            const usedExpanded = connectUri !== MONGO_URI;
            if (srv && !usedExpanded && (0, mongoConnect_1.isLikelySrvDnsFailure)(err)) {
                try {
                    console.warn("Driver SRV failed; retrying after SRV expand (set MONGO_DNS_SERVERS if this repeats).");
                    const expanded = await (0, mongoConnect_1.expandMongoSrvToTcpUri)(MONGO_URI);
                    await mongoose_1.default.connect(expanded, mongoOptions);
                    console.log("MongoDB connected ✅ (expanded SRV → TCP URI)");
                    return;
                }
                catch (secondErr) {
                    console.error("MongoDB connection failed ❌", secondErr);
                    console.error("Previous error:", err);
                    console.warn("Continuing without MongoDB. For Atlas: set MONGO_DNS_SERVERS=8.8.8.8,8.8.4.4 in server/.env or use the standard mongodb:// connection string.");
                    mongoose_1.default.set("bufferCommands", false);
                    return;
                }
            }
            console.error("MongoDB connection failed ❌", err);
            if (srv && (0, mongoConnect_1.isLikelySrvDnsFailure)(err)) {
                console.warn("Continuing without MongoDB. If you see querySrv errors: MONGO_DNS_SERVERS=8.8.8.8,8.8.4.4 in server/.env, or switch MONGO_URI to Atlas standard (mongodb://…).");
            }
            else {
                console.warn("Continuing without MongoDB. Admin login route is still available.");
            }
            mongoose_1.default.set("bufferCommands", false);
        }
    })();
}
