// simple version SKButton
// (version in SimpleKit has more features)

import { SKElement, SKElementProps, Style } from "../element";

type SKButtonProps = SKElementProps & { text?: string };

export class SKButton extends SKElement {
  constructor({ text = "?", ...elementProps }: SKButtonProps = {}) {
    super(elementProps);
    this.text = text;
  }

  text: string;
  font = Style.font;
  state: "idle" | "hover" | "down" = "idle";

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    // thick highlight rect
    if (this.state == "hover" || this.state == "down") {
      gc.beginPath();
      gc.roundRect(this.x, this.y, this.width, this.height, 4);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // normal background
    gc.beginPath();
    gc.roundRect(this.x, this.y, this.width, this.height, 4);
    gc.fillStyle =
      this.state == "down"
        ? Style.highlightColour
        : Style.defaultColour;
    gc.strokeStyle = "black";
    // change fill to show down state
    gc.lineWidth = this.state == "down" ? 4 : 2;
    gc.fill();
    gc.stroke();

    // button label
    gc.font = this.font;
    gc.fillStyle = "black";
    gc.textAlign = "center";
    gc.textBaseline = "middle";
    gc.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2
    );

    gc.restore();
  }
}
