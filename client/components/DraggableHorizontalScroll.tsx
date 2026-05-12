"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

const DRAG_THRESHOLD_PX = 10;

type DraggableHorizontalScrollProps = {
  children: ReactNode;
  /** Announced to assistive tech (e.g. "Music videos, draggable horizontally") */
  ariaLabel: string;
  className?: string;
  /** Applied to the inner flex row (default: gap-4 md:gap-6) */
  gapClassName?: string;
};

export default function DraggableHorizontalScroll({
  children,
  ariaLabel,
  className = "",
  gapClassName = "gap-4 md:gap-6",
}: DraggableHorizontalScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    dragging: boolean;
  } | null>(null);
  const suppressNextClickRef = useRef(false);

  const stopClickIfSuppressed = useCallback((e: MouseEvent) => {
    if (!suppressNextClickRef.current) return;
    const root = scrollRef.current;
    const target = e.target;
    if (!root || !(target instanceof Node)) {
      suppressNextClickRef.current = false;
      return;
    }
    if (!root.contains(target)) {
      suppressNextClickRef.current = false;
      return;
    }
    suppressNextClickRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  }, []);

  useEffect(() => {
    document.addEventListener("click", stopClickIfSuppressed, true);
    return () => document.removeEventListener("click", stopClickIfSuppressed, true);
  }, [stopClickIfSuppressed]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      dragging: false,
    };
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = scrollRef.current;
    if (!state || !el || e.pointerId !== state.pointerId) return;

    const dx = e.clientX - state.startX;
    if (!state.dragging && Math.abs(dx) >= DRAG_THRESHOLD_PX) {
      state.dragging = true;
    }
    if (state.dragging) {
      el.scrollLeft = state.startScrollLeft - dx;
      e.preventDefault();
    }
  };

  const endPointer = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = scrollRef.current;
    if (!state || e.pointerId !== state.pointerId) return;

    if (state.dragging) {
      suppressNextClickRef.current = true;
    }
    dragState.current = null;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div
      ref={scrollRef}
      role="region"
      aria-label={ariaLabel}
      data-lenis-prevent
      className={`scrollbar-hide cursor-grab overflow-x-auto overflow-y-hidden active:cursor-grabbing ${className}`}
      style={{ touchAction: "pan-x" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
    >
      <div className={`flex w-max min-w-max flex-row ${gapClassName}`}>{children}</div>
    </div>
  );
}
