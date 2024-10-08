import {
  startSimpleKit,
  setSKDrawCallback,
} from "../../simplekit/src/canvas-mode";

import { SKLabel } from "./label.ts";

// create a test label
const label = new SKLabel({
  text: "Test Label",
  x: 50,
  y: 50,
});
// can change other properties
// label.width = 200;
// label.align = "right";

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  label.draw(gc);
});

startSimpleKit();
