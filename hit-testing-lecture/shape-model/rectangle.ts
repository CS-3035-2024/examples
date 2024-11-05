import { Shape } from "./shape";
import {
  edgeHitTestRectangle,
  insideHitTestRectangle,
} from "./hittest";

export class Rectangle extends Shape {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {
    super();
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = this.fill;
    gc.strokeStyle = this.stroke;
    gc.lineWidth = this.strokeWidth;
    gc.beginPath();
    gc.rect(this.x, this.y, this.w, this.h);
    if (this.isFilled) gc.fill();
    if (this.isStroked) gc.stroke();
    gc.restore();
  }

  hitTest(mx: number, my: number) {
    let hit = false;
    if (this.isFilled) {
      hit = insideHitTestRectangle(
        mx,
        my,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
    if (this.isStroked) {
      hit ||= edgeHitTestRectangle(
        mx,
        my,
        this.x,
        this.y,
        this.w,
        this.h,
        this.strokeWidth
      );
    }
    return hit;
  }
}
