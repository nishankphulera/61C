import { Request, Response } from "express";
import { ensureMongoForRead } from "../lib/mongoReady";
import ContactSubmission from "../models/ContactSubmission";

type ContactBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function validateContactBody(body: ContactBody): string | null {
  const fullName = body.fullName?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  if (!fullName) return "Full name is required";
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
  if (!message) return "Message is required";
  return null;
}

export async function createContactSubmission(req: Request, res: Response): Promise<void> {
  if (!ensureMongoForRead(res)) return;

  const body = req.body as ContactBody;
  const validationError = validateContactBody(body);
  if (validationError) {
    res.status(400).json({ message: validationError });
    return;
  }

  const doc = await ContactSubmission.create({
    fullName: body.fullName!.trim(),
    email: body.email!.trim().toLowerCase(),
    phone: body.phone?.trim() ?? "",
    message: body.message!.trim(),
  });

  res.status(201).json({
    id: String(doc._id),
    message: "Thank you — we received your message.",
  });
}

const ADMIN_CONTACT_LIST_LIMIT = 500;

export async function getAdminContactSubmissions(_req: Request, res: Response): Promise<void> {
  if (!ensureMongoForRead(res)) return;

  const rows = await ContactSubmission.find()
    .sort({ createdAt: -1 })
    .limit(ADMIN_CONTACT_LIST_LIMIT)
    .lean()
    .exec();

  res.json(
    rows.map((row) => ({
      _id: String(row._id),
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      message: row.message,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }))
  );
}
