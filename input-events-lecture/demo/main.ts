/**
 * SimpleKit Example Project
 *
 * uses a Drawable Square
 * sets event handler with "switch" dispatch
 * sets draw handler
 * starts SimpleKit
 */

import {
  SKEvent,
  SKMouseEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
} from "../../simplekit/src/canvas-mode";
// local import
import { Square } from "./square";

// drawable square (from Drawing lecture)
const square = new Square(0, 0, 50, "whitesmoke", "black", 2);

// event handler with switch statement dispatch
function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousemove":
      const { x, y } = e as SKMouseEvent;
      square.x = x;
      square.y = y;
      break;
    case "click":
      const fill = `hsl(${Math.random() * 360} 100% 50%)`;
      square.fill = fill;
      break;
    case "drag":
      square.size += 2;
      break;
    case "dblclick":
      square.size = 50;
      break;
    case "keydown":
      square.fill = "pink";
      break;
  }
}

// set the event handler
setSKEventListener(handleEvent);

// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  // we just draw the current state of the square
  square.draw(gc);
});

// start SimpleKit
startSimpleKit();
