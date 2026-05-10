"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminContent = getAdminContent;
exports.getAdminContentById = getAdminContentById;
exports.createContent = createContent;
exports.updateContent = updateContent;
exports.deleteContent = deleteContent;
exports.getPublicContent = getPublicContent;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoReady_1 = require("../lib/mongoReady");
const Content_1 = __importStar(require("../models/Content"));
function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    }
    catch {
        return false;
    }
}
function validatePayload(payload) {
    if (!Content_1.PAGES.includes(payload.page)) {
        return "Invalid page value";
    }
    if (!payload.section?.trim())
        return "Section is required";
    if (!payload.title?.trim())
        return "Title is required";
    if (!Content_1.MEDIA_TYPES.includes(payload.mediaType)) {
        return "Invalid mediaType value";
    }
    if (payload.thumbnailUrl && !isValidUrl(payload.thumbnailUrl)) {
        return "thumbnailUrl must be a valid URL";
    }
    if (payload.youtubeUrl && !isValidUrl(payload.youtubeUrl)) {
        return "youtubeUrl must be a valid URL";
    }
    if (payload.videoUrl && !isValidUrl(payload.videoUrl)) {
        return "videoUrl must be a valid URL";
    }
    if (payload.images?.some((image) => !isValidUrl(image))) {
        return "All images must be valid URLs";
    }
    return null;
}
async function nextOrderForSection(page, section) {
    const trimmed = section.trim();
    const docs = await Content_1.default.find({ page, section: trimmed })
        .sort({ order: -1 })
        .limit(1)
        .select("order")
        .lean();
    const max = docs[0]?.order;
    return typeof max === "number" && Number.isFinite(max) ? max + 1 : 1;
}
/** Remove any content at this slot so the caller can occupy `order` (destructive replace). */
async function clearOrderSlot(page, section, order, excludeId) {
    const filter = {
        page,
        section: section.trim(),
        order,
    };
    if (excludeId && mongoose_1.default.Types.ObjectId.isValid(excludeId)) {
        filter._id = { $ne: new mongoose_1.default.Types.ObjectId(excludeId) };
    }
    await Content_1.default.deleteMany(filter);
}
async function getAdminContent(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const { page, section, published } = req.query;
    const filter = {};
    if (typeof page === "string" && page.trim())
        filter.page = page.trim();
    if (typeof section === "string" && section.trim())
        filter.section = section.trim();
    if (published === "true")
        filter.isPublished = true;
    if (published === "false")
        filter.isPublished = false;
    const rows = await Content_1.default.find(filter).sort({ page: 1, section: 1, order: 1, createdAt: -1 });
    res.json(rows);
}
async function getAdminContentById(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const row = await Content_1.default.findById(req.params.id);
    if (!row) {
        res.status(404).json({ message: "Content not found" });
        return;
    }
    res.json(row);
}
async function createContent(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const payload = req.body;
    const validationError = validatePayload(payload);
    if (validationError) {
        res.status(400).json({ message: validationError });
        return;
    }
    const youtubeUrl = payload.youtubeUrl?.trim() || payload.videoUrl?.trim() || "";
    const sectionTrimmed = payload.section.trim();
    let order = Number.isFinite(payload.order) ? Number(payload.order) : 0;
    if (!Number.isFinite(order) || order <= 0) {
        order = await nextOrderForSection(payload.page, sectionTrimmed);
    }
    else {
        await clearOrderSlot(payload.page, sectionTrimmed, order);
    }
    const created = await Content_1.default.create({
        page: payload.page,
        section: sectionTrimmed,
        title: payload.title.trim(),
        description: payload.description?.trim() || "",
        mediaType: payload.mediaType,
        thumbnailUrl: payload.thumbnailUrl?.trim() || "",
        youtubeUrl,
        videoUrl: youtubeUrl,
        images: payload.images ?? [],
        order,
        isPublished: payload.isPublished ?? true,
        meta: payload.meta ?? {},
    });
    res.status(201).json(created);
}
async function updateContent(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const payload = req.body;
    const existing = await Content_1.default.findById(req.params.id);
    if (!existing) {
        res.status(404).json({ message: "Content not found" });
        return;
    }
    const merged = {
        page: payload.page ?? existing.page,
        section: payload.section ?? existing.section,
        title: payload.title ?? existing.title,
        description: payload.description ?? existing.description,
        mediaType: payload.mediaType ?? existing.mediaType,
        thumbnailUrl: payload.thumbnailUrl ?? existing.thumbnailUrl,
        youtubeUrl: payload.youtubeUrl ?? existing.youtubeUrl ?? existing.videoUrl,
        videoUrl: payload.videoUrl ?? existing.videoUrl ?? existing.youtubeUrl,
        images: payload.images ?? existing.images,
        order: payload.order ?? existing.order,
        isPublished: payload.isPublished ?? existing.isPublished,
        meta: payload.meta ?? existing.meta,
    };
    const validationError = validatePayload(merged);
    if (validationError) {
        res.status(400).json({ message: validationError });
        return;
    }
    const sectionTrimmed = merged.section.trim();
    const pageStr = merged.page;
    let nextOrder = Number.isFinite(merged.order) ? Number(merged.order) : existing.order;
    if (!Number.isFinite(nextOrder) || nextOrder <= 0) {
        nextOrder = await nextOrderForSection(pageStr, sectionTrimmed);
    }
    else {
        await clearOrderSlot(pageStr, sectionTrimmed, nextOrder, existing._id.toString());
    }
    existing.page = merged.page;
    existing.section = sectionTrimmed;
    existing.title = merged.title.trim();
    existing.description = merged.description?.trim() || "";
    existing.mediaType = merged.mediaType;
    existing.thumbnailUrl = merged.thumbnailUrl?.trim() || "";
    existing.youtubeUrl = merged.youtubeUrl?.trim() || merged.videoUrl?.trim() || "";
    existing.videoUrl = existing.youtubeUrl;
    existing.images = merged.images ?? [];
    existing.order = nextOrder;
    existing.isPublished = merged.isPublished ?? true;
    existing.meta = merged.meta ?? {};
    await existing.save();
    res.json(existing);
}
async function deleteContent(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const removed = await Content_1.default.findByIdAndDelete(req.params.id);
    if (!removed) {
        res.status(404).json({ message: "Content not found" });
        return;
    }
    res.status(204).send();
}
async function getPublicContent(req, res) {
    if (!(0, mongoReady_1.ensureMongoForRead)(res))
        return;
    const { page, section } = req.query;
    const filter = { isPublished: true };
    if (typeof page === "string" && page.trim())
        filter.page = page.trim();
    if (typeof section === "string" && section.trim())
        filter.section = section.trim();
    const rows = await Content_1.default.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(rows);
}
