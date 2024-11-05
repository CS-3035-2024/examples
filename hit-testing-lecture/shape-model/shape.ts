export abstract class Shape {
  fill: string = "grey";
  stroke: string = "black";
  strokeWidth = 1;

  get isFilled() {
    return this.fill != "";
  }

  get isStroked() {
    return this.stroke != "" && this.strokeWidth > 0;
  }

  // this is the "drawable" part of Shape
  abstract draw(gc: CanvasRenderingContext2D): void;

  abstract hitTest(mx: number, my: number): boolean;
}
