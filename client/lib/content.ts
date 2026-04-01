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

export const FILMS_SECTIONS = ["films", "music-videos", "vertical-films", "more-films"] as const;
export const PHOTOGRAPHY_SECTIONS = [
  "product-fnb",
  "automobile",
  "events-shows",
  "hospitality",
  "fashion-lifestyle",
  "artist-profiles",
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
