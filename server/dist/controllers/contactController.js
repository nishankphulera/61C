"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactSubmission = createContactSubmission;
exports.getAdminContactSubmissions = getAdminContactSubmissions;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mongoReady_1 = require("../lib/mongoReady");
const ContactSubmission_1 = __importDefault(require("../models/ContactSubmission"));
function validateContactBody(body) {
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    if (!fullName)
        return "Full name is required";
    if (!email)
        return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return "Invalid email address";
    if (!message)
        return "Message is required";
    return null;
}
async function createContactSubmission(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const body = req.body;
    const validationError = validateContactBody(body);
    if (validationError) {
        res.status(400).json({ message: validationError });
        return;
    }
    const doc = await ContactSubmission_1.default.create({
        fullName: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() ?? "",
        message: body.message.trim(),
    });
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS, // User must configure this in server/.env
            },
        });
        const mailOptions = {
            from: `"${doc.fullName}" <${doc.email}>`,
            replyTo: doc.email,
            to: "hello@61cstudios.com",
            subject: "New Contact Form Submission - 61C Studios",
            text: `New query received from 61C Studios contact form:

Name: ${doc.fullName}
Email: ${doc.email}
Phone: ${doc.phone || "N/A"}

Message:
${doc.message}
`,
        };
        await transporter.sendMail(mailOptions);
    }
    catch (err) {
        console.error("Error sending contact email:", err);
    }
    res.status(201).json({
        id: String(doc._id),
        message: "Thank you — we received your message.",
    });
}
const ADMIN_CONTACT_LIST_LIMIT = 500;
async function getAdminContactSubmissions(_req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const rows = await ContactSubmission_1.default.find()
        .sort({ createdAt: -1 })
        .limit(ADMIN_CONTACT_LIST_LIMIT)
        .lean()
        .exec();
    res.json(rows.map((row) => ({
        _id: String(row._id),
        fullName: row.fullName,
        email: row.email,
        phone: row.phone,
        message: row.message,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    })));
}
