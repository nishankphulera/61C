import { Request, Response } from "express";
import Content, { MEDIA_TYPES, PAGES } from "../models/Content";

type ContentPayload = {
  page: string;
  section: string;
  title: string;
  description?: string;
  mediaType: string;
  thumbnailUrl?: string;
  youtubeUrl?: string;
  videoUrl?: string;
  images?: string[];
  order?: number;
  isPublished?: boolean;
  meta?: Record<string, unknown>;
};

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validatePayload(payload: ContentPayload): string | null {
  if (!PAGES.includes(payload.page as (typeof PAGES)[number])) {
    return "Invalid page value";
  }
  if (!payload.section?.trim()) return "Section is required";
  if (!payload.title?.trim()) return "Title is required";
  if (!MEDIA_TYPES.includes(payload.mediaType as (typeof MEDIA_TYPES)[number])) {
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

export async function getAdminContent(req: Request, res: Response): Promise<void> {
  const { page, section, published } = req.query;
  const filter: Record<string, unknown> = {};

  if (typeof page === "string" && page.trim()) filter.page = page.trim();
  if (typeof section === "string" && section.trim()) filter.section = section.trim();
  if (published === "true") filter.isPublished = true;
  if (published === "false") filter.isPublished = false;

  const rows = await Content.find(filter).sort({ page: 1, section: 1, order: 1, createdAt: -1 });
  res.json(rows);
}

export async function getAdminContentById(req: Request, res: Response): Promise<void> {
  const row = await Content.findById(req.params.id);
  if (!row) {
    res.status(404).json({ message: "Content not found" });
    return;
  }
  res.json(row);
}

export async function createContent(req: Request, res: Response): Promise<void> {
  const payload = req.body as ContentPayload;
  const validationError = validatePayload(payload);
  if (validationError) {
    res.status(400).json({ message: validationError });
    return;
  }

  const youtubeUrl = payload.youtubeUrl?.trim() || payload.videoUrl?.trim() || "";
  const created = await Content.create({
    page: payload.page,
    section: payload.section.trim(),
    title: payload.title.trim(),
    description: payload.description?.trim() || "",
    mediaType: payload.mediaType,
    thumbnailUrl: payload.thumbnailUrl?.trim() || "",
    youtubeUrl,
    videoUrl: youtubeUrl,
    images: payload.images ?? [],
    order: Number.isFinite(payload.order) ? Number(payload.order) : 0,
    isPublished: payload.isPublished ?? true,
    meta: payload.meta ?? {},
  });

  res.status(201).json(created);
}

export async function updateContent(req: Request, res: Response): Promise<void> {
  const payload = req.body as Partial<ContentPayload>;
  const existing = await Content.findById(req.params.id);
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

  existing.page = merged.page as (typeof PAGES)[number];
  existing.section = merged.section.trim();
  existing.title = merged.title.trim();
  existing.description = merged.description?.trim() || "";
  existing.mediaType = merged.mediaType as (typeof MEDIA_TYPES)[number];
  existing.thumbnailUrl = merged.thumbnailUrl?.trim() || "";
  existing.youtubeUrl = merged.youtubeUrl?.trim() || merged.videoUrl?.trim() || "";
  existing.videoUrl = existing.youtubeUrl;
  existing.images = merged.images ?? [];
  existing.order = Number.isFinite(merged.order) ? Number(merged.order) : 0;
  existing.isPublished = merged.isPublished ?? true;
  existing.meta = merged.meta ?? {};

  await existing.save();
  res.json(existing);
}

export async function deleteContent(req: Request, res: Response): Promise<void> {
  const removed = await Content.findByIdAndDelete(req.params.id);
  if (!removed) {
    res.status(404).json({ message: "Content not found" });
    return;
  }
  res.status(204).send();
}

export async function getPublicContent(req: Request, res: Response): Promise<void> {
  const { page, section } = req.query;
  const filter: Record<string, unknown> = { isPublished: true };

  if (typeof page === "string" && page.trim()) filter.page = page.trim();
  if (typeof section === "string" && section.trim()) filter.section = section.trim();

  const rows = await Content.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(rows);
}
