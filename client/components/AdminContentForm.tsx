"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ContentItem,
  ContentPage,
  getSectionOptionsByPage,
  MEDIA_TYPE_OPTIONS,
  PAGE_OPTIONS,
} from "@/lib/content";

type FormState = {
  page: ContentPage;
  section: string;
  title: string;
  description: string;
  mediaType: "video" | "image" | "gallery";
  thumbnailUrl: string;
  youtubeUrl: string;
  imagesText: string;
  order: number;
  isPublished: boolean;
};

type Props = {
  initial?: ContentItem;
  onSubmit: (payload: Partial<ContentItem>) => Promise<void>;
  submitLabel: string;
};

export default function AdminContentForm({ initial, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<FormState>({
    page: initial?.page || "films",
    section: initial?.section || "music-videos",
    title: initial?.title || "",
    description: initial?.description || "",
    mediaType: initial?.mediaType || "image",
    thumbnailUrl: initial?.thumbnailUrl || "",
    youtubeUrl: initial?.youtubeUrl || initial?.videoUrl || "",
    imagesText: initial?.images?.join("\n") || "",
    order: initial?.order ?? 0,
    isPublished: initial?.isPublished ?? true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sectionOptions = useMemo(() => getSectionOptionsByPage(form.page), [form.page]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError("");
    const orderVal = Number(form.order);
    if (Number.isFinite(orderVal) && orderVal < -1) {
      setError("order must be -1, 0, or a positive integer");
      return;
    }
    setSubmitting(true);
    try {
      const payload: Partial<ContentItem> = {
        page: form.page,
        section: form.section,
        title: form.title.trim(),
        description: form.description.trim(),
        mediaType: form.mediaType,
        thumbnailUrl: form.thumbnailUrl.trim(),
        youtubeUrl: form.youtubeUrl.trim(),
        videoUrl: form.youtubeUrl.trim(),
        images: form.imagesText
          .split("\n")
          .map((row) => row.trim())
          .filter(Boolean),
        order: Number(form.order),
        isPublished: form.isPublished,
      };
      await onSubmit(payload);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to save content");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span>Page</span>
          <select
            value={form.page}
            onChange={(e) => {
              const page = e.target.value as ContentPage;
              const options = getSectionOptionsByPage(page);
              setForm((prev) => ({ ...prev, page, section: options[0] || "" }));
            }}
            className="w-full rounded-md bg-black px-3 py-2"
          >
            {PAGE_OPTIONS.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm">
          <span>Section</span>
          <select
            value={form.section}
            onChange={(e) => setForm((prev) => ({ ...prev, section: e.target.value }))}
            className="w-full rounded-md bg-black px-3 py-2"
          >
            {sectionOptions.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-1 text-sm">
          <span>Title</span>
          <input
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
            className="w-full rounded-md bg-black px-3 py-2"
          />
        </label>

        <label className="space-y-1 text-sm">
          <span>Media type</span>
          <select
            value={form.mediaType}
            onChange={(e) => setForm((prev) => ({ ...prev, mediaType: e.target.value as FormState["mediaType"] }))}
            className="w-full rounded-md bg-black px-3 py-2"
          >
            {MEDIA_TYPE_OPTIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-1 text-sm block">
        <span>Description</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          className="h-24 w-full rounded-md bg-black px-3 py-2"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span>Thumbnail URL</span>
          <input
            value={form.thumbnailUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
            className="w-full rounded-md bg-black px-3 py-2"
          />
        </label>

        <label className="space-y-1 text-sm">
          <span>YouTube URL</span>
          <input
            value={form.youtubeUrl}
            onChange={(e) => setForm((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
            className="w-full rounded-md bg-black px-3 py-2"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm block">
        <span>Gallery image URLs (one per line)</span>
        <textarea
          value={form.imagesText}
          onChange={(e) => setForm((prev) => ({ ...prev, imagesText: e.target.value }))}
          className="h-28 w-full rounded-md bg-black px-3 py-2"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span>Order</span>
          <input
            type="number"
            min={-1}
            step={1}
            value={form.order}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                order: e.target.value === "" ? 0 : Number(e.target.value),
              }))
            }
            className="w-full rounded-md bg-black px-3 py-2"
          />
          <span className="block text-xs text-white/60">
            -1 prepends to the front of this section (others shift down; no destructive replace). 0 uses the next
            free slot (last). 1+ sets an explicit slot; if that slot is taken, the existing row is removed and
            replaced. Order must not be below -1.
          </span>
        </label>
        <label className="mt-6 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
          />
          Published
        </label>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black disabled:opacity-60"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
