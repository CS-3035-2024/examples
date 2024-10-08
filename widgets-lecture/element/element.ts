// simple version SKElement
// (version in SimpleKit has more features)

import { insideHitTestRectangle } from "../../simplekit/src/utility";


const minElementSize = 32;

// element properties
export type SKElementProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

// element is a base widget class
export abstract class SKElement {
  constructor({
    x = 0,
    y = 0,
    width = minElementSize,
    height = minElementSize,
  }: SKElementProps = {}) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // top-left corner of element bounding box
  x = 0;
  y = 0;

  // size of element's bounding box
  width = minElementSize;
  height = minElementSize;

  hitTest(mx: number, my: number): boolean {
    return insideHitTestRectangle(
      mx,
      my,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  abstract draw(gc: CanvasRenderingContext2D): void;
}
