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
  "architecture-real-estate",
  "fashion-lifestyle",
  "artist-profiles",
  "automobiles",
  "events",
] as const;

export const SECTION_LABELS: Record<string, string> = {
  "music-videos": "Music Videos",
  "brand-films": "Brand Films",
  "vertical-films": "Vertical Films",
  documentaries: "Documentaries",
  fnb: "F&B",
  product: "Product",
  hospitality: "Hospitality",
  "architecture-real-estate": "Architecture & Real estate",
  spaces: "Architecture & Real estate (legacy)",
  "fashion-lifestyle": "Fashion & Lifestyle",
  automobiles: "Automobiles",
  "artist-profiles": "Artists Profiles",
  events: "Events",
  design: "Design",
  "album-art": "Album Art",
  "animation": "Animation",
};

export function getSectionLabel(section: string): string {
  return SECTION_LABELS[section] ?? section;
}
export const DESIGN_SECTIONS = ["album-art", "animation"] as const;

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
