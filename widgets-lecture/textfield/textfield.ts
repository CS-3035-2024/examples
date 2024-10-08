// simple version SKTextfield
// (version in SimpleKit has more features)

import { measureText } from "../../simplekit/src/utility";
import { SKElement, SKElementProps, Style } from "../element";

type SKTextfieldProps = SKElementProps & {
  text?: string;
};

export class SKTextfield extends SKElement {
  constructor({
    text = "?",
    ...elementProps
  }: SKTextfieldProps = {}) {
    super(elementProps);

    this._text = text;

    // find size of text to set height (and width if not specified)
    const m = measureText(this._text, this.font);

    if (!m) {
      console.warn(
        `measureText failed in SKTextfield with '${text}'`
      );
      return;
    }

    // set the height
    this.height = m.height + Style.textPadding * 2;

    // set the width from measure text unless specified in constructor
    this.textWidth = m.width;
    this.width =
      elementProps.width || this.textWidth + Style.textPadding * 2;
  }

  protected _text: string;
  get text() {
    return this._text;
  }
  set text(t: string) {
    this._text = t;
    const m = measureText(this._text, this.font);
    if (m) this.textWidth = m.width;
  }

  font = Style.font;
  textWidth = 0;

  state: "idle" | "hover" = "idle";
  focus = false;

  applyEdit(text: string, key: string): string {
    if (key == "Backspace") {
      return text.slice(0, -1);
    } else if (key.length == 1) {
      return text + key;
    } else return text;
  }

  draw(gc: CanvasRenderingContext2D) {
    const padding = 10;

    gc.save();

    // thick highlight rect
    if (this.state == "hover") {
      gc.beginPath();
      gc.rect(this.x, this.y, this.width, this.height);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // border
    gc.beginPath();
    gc.rect(this.x, this.y, this.width, this.height);
    gc.fillStyle = "white";
    gc.fill();
    gc.lineWidth = 1;
    gc.strokeStyle = this.focus ? Style.focusColour : "black";
    gc.stroke();
    // clip text if it's wider than text area
    // TODO: could scroll text if it's wider than text area
    gc.clip();

    // TODO: highlight text
    if (false) {
      gc.fillStyle = Style.highlightColour;
      gc.fillRect(
        this.x + padding,
        this.y + padding / 2,
        50,
        this.height - padding
      );
    }

    // text
    gc.font = Style.font;
    gc.fillStyle = "black";
    gc.textBaseline = "middle";
    gc.textAlign = "left";
    gc.fillText(
      this._text,
      this.x + padding,
      this.y + this.height / 2
    );

    // simple cursor
    if (this.focus) {
      const cursorX = this.x + padding + this.textWidth + 1;
      const cursorHeight = this.height - Style.textPadding;
      gc.beginPath();
      gc.moveTo(cursorX, this.y + Style.textPadding / 2);
      gc.lineTo(cursorX, this.y + cursorHeight);
      gc.lineWidth = 1;
      gc.strokeStyle = "black";
      gc.stroke();
    }

    gc.restore();
  }
}
