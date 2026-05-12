export const PAGE_OPTIONS = ["films", "photography", "design"] as const;
export const MEDIA_TYPE_OPTIONS = ["video", "image", "gallery"] as const;

export type ContentPage = (typeof PAGE_OPTIONS)[number];
export type MediaType = (typeof MEDIA_TYPE_OPTIONS)[number];

export type ContentItem = {
  _id: string;
  page: ContentPage;
  section: string;
  title: string;
  description?: string;
  mediaType: MediaType;
  thumbnailUrl?: string;
  youtubeUrl?: string;
  videoUrl?: string;
  images: string[];
  order: number;
  isPublished: boolean;
  meta?: Record<string, unknown>;
};

export const FILMS_SECTIONS = [
  "music-videos",
  "brand-films",
  "vertical-films",
  "documentaries",
] as const;
export const PHOTOGRAPHY_SECTIONS = [
  "fnb",
  "product",
  "hospitality",
  "spaces",
  "fashion-lifestyle",
  "automobiles",
  "artist-profiles",
  "events",
] as const;
export const DESIGN_SECTIONS = ["design"] as const;

export const SECTION_OPTIONS = [
  ...FILMS_SECTIONS,
  ...PHOTOGRAPHY_SECTIONS,
  ...DESIGN_SECTIONS,
] as const;

export function getSectionOptionsByPage(page: ContentPage): readonly string[] {
  if (page === "films") return FILMS_SECTIONS;
  if (page === "photography") return PHOTOGRAPHY_SECTIONS;
  return DESIGN_SECTIONS;
}

/** Ascending by `order` (1 first), stable tie-break for legacy duplicates. */
export function compareContentByOrder(a: ContentItem, b: ContentItem): number {
  const byOrder = a.order - b.order;
  if (byOrder !== 0) return byOrder;
  return String(a._id).localeCompare(String(b._id));
}
