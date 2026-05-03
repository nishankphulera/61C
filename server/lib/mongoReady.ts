import type { Response } from "express";
import mongoose from "mongoose";

/** Allow reads while connecting (mongoose buffers). Block only when disconnected / failed. */
export function ensureMongoForRead(res: Response): boolean {
  const uri = (process.env.MONGO_URI || "").trim();
  if (!uri) {
    res.status(503).json({
      message: "MONGO_URI is not set on this server. Add it to ~/61c/shared/server.env and restart the API.",
    });
    return false;
  }
  const s = mongoose.connection.readyState;
  if (s === 1 || s === 2) return true;
  res.status(503).json({
    message:
      "Database is not connected. If Atlas already allows 0.0.0.0/0, check MONGO_URI (cluster hostname, username, URL-encoded password) and see pm2 logs for the MongoDB connection error.",
  });
  return false;
}
