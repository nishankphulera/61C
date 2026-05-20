/**
 * Shared layout for photography sections that must match {@link ProductFAndB} tile geometry.
 */

/** Responsive grid: 2 → 3 → 6 columns; auto row wrap for N ≠ 12. */
export const PHOTO_UNIFORM_GRID_CLASS =
  "grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 lg:gap-6 px-4 md:px-8";

/** Use with 12 items so md lays out exactly two rows of six (optional). */
export const PHOTO_UNIFORM_GRID_MD_TWO_ROWS = "md:grid-rows-2";

/** Square tile shell (add section-specific class for GSAP, e.g. `product-card`). */
export const PHOTO_UNIFORM_CARD_CLASS =
  "relative aspect-square w-full min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-lg bg-black/40 shadow-lg";

export const PHOTO_UNIFORM_IMAGE_SIZES =
  "(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw";
