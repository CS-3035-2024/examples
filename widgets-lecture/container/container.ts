// simple version SKContainer
// (version in SimpleKit has more features)

import { SKElement, SKElementProps } from "../element";

type SKContainerProps = SKElementProps & { fill?: string };

export class SKContainer extends SKElement {
  constructor({ fill = "", ...elementProps }: SKContainerProps = {}) {
    super(elementProps);
    this.fill = fill;
  }

  // background colour
  fill: string;

  //#region managing children

  private _children: SKElement[] = [];
  get children(): readonly SKElement[] {
    return this._children;
  }

  addChild(element: SKElement) {
    this._children.push(element);
  }

  removeChild(element: SKElement) {
    this._children = this._children.filter((el) => el != element);
  }

  clearChildren() {
    this._children = [];
  }

  //#endregion

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    // set coordinate system to padding box
    gc.translate(this.x, this.y);

    // draw background colour if set
    if (this.fill) {
      gc.fillStyle = this.fill;
      gc.fillRect(0, 0, this.width, this.height);
    }

    gc.restore();

    // now draw all the children
    gc.save();
    // set coordinate system to container content box
    gc.translate(this.x, this.y);
    // draw children
    this._children.forEach((el) => el.draw(gc));
    gc.restore();
  }

  public toString(): string {
    return `SKContainer `;
  }
}
