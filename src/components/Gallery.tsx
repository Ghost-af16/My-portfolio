"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { GalleryItemConfig } from "@/lib/config";
import { getClosestGalleryIndex, getGalleryDragDirection, getNextGalleryIndex } from "@/lib/gallery";

export function Gallery({ items }: { items: GalleryItemConfig[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragStartIndex = useRef(0);
  const dragged = useRef(false);
  const activePointer = useRef<number | null>(null);

  const moveTo = (index: number) => {
    setActiveIndex(index);
    trackRef.current?.children[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const move = (direction: -1 | 1) => moveTo(getNextGalleryIndex(activeIndex, direction, items.length));

  const updateActiveImage = () => {
    const track = trackRef.current;
    if (!track) return;
    const centers = Array.from(track.children).map((child) => {
      const element = child as HTMLElement;
      return element.offsetLeft + element.offsetWidth / 2;
    });
    setActiveIndex(getClosestGalleryIndex(centers, track.scrollLeft + track.clientWidth / 2));
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    activePointer.current = event.pointerId;
    dragStartX.current = event.clientX;
    dragStartScroll.current = event.currentTarget.scrollLeft;
    dragStartIndex.current = activeIndex;
    dragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    const distance = event.clientX - dragStartX.current;
    if (Math.abs(distance) > 6) dragged.current = true;
    event.currentTarget.scrollLeft = dragStartScroll.current - distance;
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointer.current !== event.pointerId) return;
    const direction = getGalleryDragDirection(event.clientX - dragStartX.current);
    activePointer.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    moveTo(direction === 0 ? dragStartIndex.current : getNextGalleryIndex(dragStartIndex.current, direction, items.length));
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => getNextGalleryIndex(current ?? 0, -1, items.length));
      if (event.key === "ArrowRight") setLightboxIndex((current) => getNextGalleryIndex(current ?? 0, 1, items.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, items.length]);

  return (
    <section id="gallery" className="py-24 px-6 bg-surface-light border-y border-border" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto">
        <p className="terminal-label">~/gallery</p>
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 id="gallery-heading" className="text-3xl md:text-5xl text-heading font-semibold">Beyond the code.</h2>
          <span className="shrink-0 font-mono text-sm text-accent">{String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            onScroll={updateActiveImage}
            onPointerDown={startDrag}
            onPointerMove={drag}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className="flex cursor-grab snap-x snap-mandatory touch-pan-y select-none gap-5 overflow-x-auto pb-5 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => {
                  if (dragged.current) {
                    dragged.current = false;
                    return;
                  }
                  setLightboxIndex(index);
                }}
                onFocus={() => setActiveIndex(index)}
                className="terminal-panel group relative aspect-[4/3] w-[88%] shrink-0 snap-center overflow-hidden text-left md:w-[72%]"
                aria-label={`Open image ${index + 1}: ${item.alt}`}
              >
                <Image draggable={false} src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 88vw, 72vw" className="pointer-events-none object-cover transition duration-500 group-hover:scale-[1.02] group-hover:brightness-75" />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-16 text-sm text-white transition-transform duration-300 group-hover:translate-y-0">{item.alt}</span>
              </button>
            ))}
          </div>

          <div className="mt-3 flex justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-body-muted">Scroll / swipe to explore</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} className="terminal-panel grid size-11 place-items-center text-accent transition hover:bg-accent hover:text-black" aria-label="Previous image"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => move(1)} className="terminal-panel grid size-11 place-items-center text-accent transition hover:bg-accent hover:text-black" aria-label="Next image"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-label="Gallery image viewer">
          <button type="button" onClick={() => setLightboxIndex(null)} className="absolute right-5 top-5 z-10 grid size-11 place-items-center border border-accent/40 bg-black text-accent" aria-label="Close image viewer"><X size={22} /></button>
          <button type="button" onClick={() => setLightboxIndex(getNextGalleryIndex(lightboxIndex, -1, items.length))} className="absolute left-3 z-10 grid size-11 place-items-center border border-accent/40 bg-black text-accent md:left-6" aria-label="Previous image"><ChevronLeft size={24} /></button>
          <div className="relative h-[82vh] w-[88vw]">
            <Image src={items[lightboxIndex].src} alt={items[lightboxIndex].alt} fill sizes="90vw" className="object-contain" priority />
          </div>
          <button type="button" onClick={() => setLightboxIndex(getNextGalleryIndex(lightboxIndex, 1, items.length))} className="absolute right-3 z-10 grid size-11 place-items-center border border-accent/40 bg-black text-accent md:right-6" aria-label="Next image"><ChevronRight size={24} /></button>
          <span className="absolute bottom-5 font-mono text-xs text-accent">{String(lightboxIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
        </div>
      )}
    </section>
  );
}
