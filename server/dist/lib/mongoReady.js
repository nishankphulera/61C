"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureMongoForRead = ensureMongoForRead;
const mongoose_1 = __importDefault(require("mongoose"));
/** Allow reads while connecting (mongoose buffers). Block only when disconnected / failed. */
function ensureMongoForRead(res) {
    const uri = (process.env.MONGO_URI || "").trim();
    if (!uri) {
        res.status(503).json({
            message: "MONGO_URI is not set on this server. Add it to ~/61c/shared/server.env and restart the API.",
        });
        return false;
    }
    const s = mongoose_1.default.connection.readyState;
    if (s === 1 || s === 2)
        return true;
    res.status(503).json({
        message: "Database is not connected. If Atlas already allows 0.0.0.0/0, check MONGO_URI (cluster hostname, username, URL-encoded password) and see pm2 logs for the MongoDB connection error.",
    });
    return false;
}
