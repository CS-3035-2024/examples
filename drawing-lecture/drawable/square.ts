import { Drawable } from "./drawable";

// basic drawable square
export class Square1 implements Drawable {
  constructor(public x: number, public y: number, public size: number) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    gc.fill();
    gc.stroke();
  }
}

export class Square2 implements Drawable {
  constructor(
    public x: number,
    public y: number,
    public size: number,
    public fill?: string, // optional parameters
    public stroke?: string,
    public lineWidth?: number
  ) {}

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
  }
}
