export function getNextGalleryIndex(current: number, direction: -1 | 1, total: number) {
  if (total <= 0) return 0;
  return (current + direction + total) % total;
}

export function getClosestGalleryIndex(imageCenters: number[], viewportCenter: number) {
  return imageCenters.reduce(
    (closest, center, index) =>
      Math.abs(center - viewportCenter) < Math.abs(imageCenters[closest] - viewportCenter) ? index : closest,
    0,
  );
}

export function getGalleryDragDirection(distance: number, threshold = 70): -1 | 0 | 1 {
  if (distance <= -threshold) return 1;
  if (distance >= threshold) return -1;
  return 0;
}
