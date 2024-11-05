import { Point2 } from "../../simplekit/src/utility";
// local
import { Shape } from "./shape";
import { edgeHitTestPolygon } from "./hittest";

export class Polygon extends Shape {
  constructor(public points: Point2[]) {
    super();
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.fillStyle = this.fill;
    gc.strokeStyle = this.stroke;
    gc.lineWidth = this.strokeWidth;
    gc.beginPath();
    this.points.forEach((p) => gc.lineTo(p.x, p.y));
    gc.closePath();
    if (this.isFilled) gc.fill();
    if (this.isStroked) gc.stroke();
    gc.restore();
  }

  hitTest(mx: number, my: number) {
    let hit = false;
    if (this.isStroked) {
      hit ||= edgeHitTestPolygon(
        mx,
        my,
        this.points,
        this.strokeWidth
      );
    }

    // NOTE: inside hit test isn't implemented

    return hit;
  }
}
