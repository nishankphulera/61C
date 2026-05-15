/**
 * Normalize external media URLs for gallery display (Google Drive, YouTube thumbs, etc.).
 */

export function extractGoogleDriveFileId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase();
    if (!host.includes("drive.google.com") && !host.includes("docs.google.com")) {
      return null;
    }
    const fileMatch = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch?.[1]) return fileMatch[1];
    const idParam = parsed.searchParams.get("id");
    if (idParam) return idParam;
  } catch {
    return null;
  }
  return null;
}

/**
 * Same-origin proxy URL for Google Drive images.
 * Avoids hotlink/referrer blocks when embedding in <img> tags.
 */
export function toGoogleDriveImageUrl(url: string): string | null {
  const id = extractGoogleDriveFileId(url);
  if (!id) return null;
  return `/api/drive-image/${id}`;
}

export function isGoogleDriveUrl(url: string): boolean {
  return extractGoogleDriveFileId(url) !== null;
}

export function isImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    const pathname = parsed.pathname.toLowerCase();
    const host = parsed.hostname.toLowerCase();
    const hasImageExtension = /\.(avif|webp|png|jpe?g|gif|svg)$/i.test(pathname);
    const knownImageHosts = [
      "picsum.photos",
      "i.ytimg.com",
      "img.youtube.com",
      "drive.google.com",
      "lh3.googleusercontent.com",
    ];
    return hasImageExtension || knownImageHosts.includes(host) || isGoogleDriveUrl(url);
  } catch {
    return false;
  }
}

export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.toLowerCase();
    if (host.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id || null;
    }
    if (host.includes("youtube.com")) {
      if (parsed.pathname.startsWith("/watch")) return parsed.searchParams.get("v");
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/embed/")[1]?.split("/")[0] || null;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/shorts/")[1]?.split("/")[0] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

type VideoFallbackSource = {
  youtubeUrl?: string | null;
  videoUrl?: string | null;
};

/** Resolve a gallery image URL, or YouTube thumbnail / null. */
export function normalizeGalleryImageUrl(
  url: string,
  fallbackSource?: VideoFallbackSource,
): string | null {
  const value = url.trim();
  if (!value) return null;

  const driveDirect = toGoogleDriveImageUrl(value);
  if (driveDirect) return driveDirect;

  if (isImageUrl(value)) return value;

  const videoSource =
    fallbackSource?.youtubeUrl?.trim() ||
    fallbackSource?.videoUrl?.trim() ||
    value;
  const videoId = extractYouTubeVideoId(videoSource);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}
