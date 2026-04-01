import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

function getAdminConfig(): { username: string; password: string; token: string } {
  return {
    username: (process.env.ADMIN_USERNAME || "admin").trim(),
    password: (process.env.ADMIN_PASSWORD || "").trim(),
    token: (process.env.ADMIN_TOKEN || "").trim(),
  };
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const { username: adminUsername, password: adminPassword } = getAdminConfig();
  const normalizedUsername = username.trim();
  const normalizedPassword = password.trim();

  if (!adminPassword) return false;
  if (normalizedUsername !== adminUsername) return false;

  const a = Buffer.from(normalizedPassword);
  const b = Buffer.from(adminPassword);
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

export function issueAdminToken(): string {
  const { username, password, token } = getAdminConfig();
  if (token) return token;
  const seed = `${username}:${password}`;
  return crypto.createHash("sha256").update(seed).digest("hex");
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const validToken = issueAdminToken();

  if (!token) {
    res.status(401).json({ message: "Missing admin token" });
    return;
  }

  const a = Buffer.from(token);
  const b = Buffer.from(validToken);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    res.status(401).json({ message: "Invalid admin token" });
    return;
  }

  next();
}
