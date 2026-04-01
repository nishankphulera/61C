import mongoose, { Document, Schema } from "mongoose";

export const PAGES = ["films", "photography", "design"] as const;
export const MEDIA_TYPES = ["video", "image", "gallery"] as const;

export type PageType = (typeof PAGES)[number];
export type MediaType = (typeof MEDIA_TYPES)[number];

export interface IContent extends Document {
  page: PageType;
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
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema<IContent>(
  {
    page: {
      type: String,
      enum: PAGES,
      required: true,
      index: true,
    },
    section: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    mediaType: {
      type: String,
      enum: MEDIA_TYPES,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
      trim: true,
    },
    youtubeUrl: {
      type: String,
      default: "",
      trim: true,
    },
    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    meta: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.index({ page: 1, section: 1, order: 1 });

const Content = mongoose.models.Content || mongoose.model<IContent>("Content", contentSchema);
export default Content;
