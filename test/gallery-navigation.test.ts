import { describe, expect, it } from "vitest";
import { getClosestGalleryIndex, getGalleryDragDirection, getNextGalleryIndex } from "../src/lib/gallery";

describe("getNextGalleryIndex", () => {
  it("wraps forward from the final image", () => {
    expect(getNextGalleryIndex(6, 1, 7)).toBe(0);
  });

  it("wraps backward from the first image", () => {
    expect(getNextGalleryIndex(0, -1, 7)).toBe(6);
  });
});

describe("getGalleryDragDirection", () => {
  it("moves forward after a left drag", () => {
    expect(getGalleryDragDirection(-90)).toBe(1);
  });

  it("moves backward after a right drag", () => {
    expect(getGalleryDragDirection(90)).toBe(-1);
  });

  it("does not move after a short drag", () => {
    expect(getGalleryDragDirection(20)).toBe(0);
  });
});

describe("getClosestGalleryIndex", () => {
  it("selects the image nearest the viewport center", () => {
    expect(getClosestGalleryIndex([0, 800, 1600], 900)).toBe(1);
  });
});
