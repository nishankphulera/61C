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
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const localDevOrigins = ["http://localhost:3000", "http://localhost:3001"];
const CLIENT_ORIGINS = Array.from(new Set(process.env.NODE_ENV === "production"
    ? configuredOrigins.length
        ? configuredOrigins
        : localDevOrigins
    : [...configuredOrigins, ...localDevOrigins]));
// Middleware
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow non-browser requests (e.g. curl/Postman) that send no Origin header.
        if (!origin) {
            callback(null, true);
            return;
        }
        if (CLIENT_ORIGINS.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
}));
app.use(express_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/public", publicRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
if (!MONGO_URI.trim()) {
    console.warn("MongoDB URI missing; starting API without DB connection.");
}
else {
    void mongoose_1.default
        .connect(MONGO_URI)
        .then(() => {
        console.log("MongoDB connected ✅");
    })
        .catch((err) => {
        console.error("MongoDB connection failed ❌", err);
        console.warn("Continuing without MongoDB. Admin login route is still available.");
    });
}
