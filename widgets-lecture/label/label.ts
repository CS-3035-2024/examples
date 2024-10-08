// simple version SKLabel
// (version in SimpleKit has more features)

import { measureText } from "../../simplekit/src/utility";

import { SKElement, SKElementProps, Style } from "../element";

type LabelAlign = "centre" | "left" | "right";

type SKLabelProps = SKElementProps & {
  text?: string;
  align?: LabelAlign;
};

export class SKLabel extends SKElement {
  constructor({
    text = "?",
    align = "centre",
    ...elementProps
  }: SKLabelProps = {}) {
    super(elementProps);

    // label-specific properties
    this.text = text;
    this.align = align;

    // find size of text to set height (and width if not specified)
    const m = measureText(this.text, this.font);

    if (!m) {
      console.warn(`measureText failed in SKLabel with '${text}'`);
      return;
    }

    // set the height
    this.height = m.height + Style.textPadding * 2;

    // set the width from measure text unless specified in constructor
    this.width =
      elementProps.width || m.width + Style.textPadding * 2;
  }

  text: string;
  font = Style.font;
  align: LabelAlign;

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    // show dashed border (for debug)
    if (true) {
      gc.strokeStyle = "grey";
      gc.setLineDash([3, 3]);
      gc.strokeRect(this.x, this.y, this.width, this.height);
    }

    //  label
    gc.font = this.font;
    gc.fillStyle = "black";
    gc.textBaseline = "middle";
    const padding = Style.textPadding;
    switch (this.align) {
      case "left":
        gc.textAlign = "left";
        gc.fillText(
          this.text,
          this.x + padding,
          this.y + this.height / 2
        );
        break;

      case "centre":
        gc.textAlign = "center";
        gc.fillText(
          this.text,
          this.x + this.width / 2,
          this.y + this.height / 2
        );
        break;

      case "right":
        gc.textAlign = "right";
        gc.fillText(
          this.text,
          this.x + this.width - padding,
          this.y + this.height / 2
        );
        break;
    }
    gc.restore();
  }
}
