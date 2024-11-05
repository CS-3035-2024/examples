import {
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  SKResizeEvent,
} from "../../simplekit/src/canvas-mode";

import { setEventListener, startRunLoop } from "./run-loop";

function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousedown":
    case "mouseup":
    case "mousemove":
    case "click":
    case "drag":
    case "dblclick":
      const { x, y } = e as SKMouseEvent;
      console.log(`${e.type} (${x}, ${y}) at ${e.timeStamp} `);
      break;
    case "keydown":
    case "keyup":
      const { key } = e as SKKeyboardEvent;
      console.log(`${e.type} '${key}' at ${e.timeStamp} `);
      break;
    case "resize":
      const { width: w, height: h } = e as SKResizeEvent;
      console.log(`${e.type} (${w}, ${h}) at ${e.timeStamp} `);
      break;
  }
}

setEventListener(handleEvent);

startRunLoop();
