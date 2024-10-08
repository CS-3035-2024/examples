import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKKeyboardEvent,
} from "../../simplekit/src/canvas-mode";

import { SKTextfield } from "./textfield.ts";

// create a test label
const textfield = new SKTextfield({
  text: "Hello Textfield",
  x: 50,
  y: 50,
  width: 150,
});

setSKEventListener((e) => {
  switch (e.type) {
    case "mousemove":
      {
        // testing mouseexit/mouseenter behaviour
        const { x, y } = e as SKMouseEvent;
        if (textfield.hitTest(x, y)) {
          textfield.state = "hover";
        } else {
          textfield.state = "idle";
        }
      }
      break;
    case "click":
      {
        // test getting and losing keyboard focus
        const { x, y } = e as SKMouseEvent;
        if (textfield.hitTest(x, y)) {
          textfield.focus = true;
        } else {
          textfield.focus = false;
        }
      }
      break;

    case "keydown":
      const { key } = e as SKKeyboardEvent;
      // test editing text (only when focused)
      if (textfield.focus && key) {
        textfield.text = textfield.applyEdit(textfield.text, key);
      }
      break;
  }
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  textfield.draw(gc);
});

startSimpleKit();
