import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
} from "../../simplekit/src/canvas-mode";

import { SKButton } from "./button.ts";

import { Style } from "../element/style";

// Style.highlightColour = "lightgreen";

// create a test button
const button = new SKButton({
  text: "Test",
  x: 50,
  y: 50,
  width: 100,
});

setSKEventListener((e) => {
  // test button behaviour
  switch (e.type) {
    case "mousemove":
      {
        if (button.state !== "down") {
          const { x, y } = e as SKMouseEvent;
          if (button.hitTest(x, y)) {
            button.state = "hover";
          } else {
            button.state = "idle";
          }
        }
      }
      break;

    case "mousedown":
      {
        const { x, y } = e as SKMouseEvent;
        if (button.hitTest(x, y)) {
          button.state = "down";
        }
      }
      break;

    case "mouseup":
      {
        if (button.state === "down") {
          console.log("button click action");
          button.state = "idle";
        }
      }
      break;
  }
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  button.draw(gc);
});

startSimpleKit();
