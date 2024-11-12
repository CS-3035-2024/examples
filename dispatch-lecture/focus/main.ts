console.log("dispatch/src/propagation/main.ts");

import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKContainer,
} from "../../simplekit/src/imperative-mode";

import { mouseDispatch } from "./dispatch-mouse";
import { SKButtonDemo } from "./button";
import { SKTextfieldDemo } from "./textfield";

// this will be the "root" of the UI widget tree
const root = new SKContainer({
  x: 10,
  y: 10,
  width: 300,
  height: 300,
});
root.fill = "white";

const button = new SKButtonDemo({
  text: "Test",
  x: 10,
  y: 10,
  width: 80,
});

const textfield1 = new SKTextfieldDemo({
  text: "One",
  x: 10,
  y: 50,
  width: 80,
});
const textfield2 = new SKTextfieldDemo({
  text: "Two",
  x: 10,
  y: 90,
  width: 80,
});

// build the widget tree
root.addChild(button);
root.addChild(textfield1);
root.addChild(textfield2);

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  root.draw(gc); // draw from root
});

setSKEventListener((e) => {
  if (e instanceof SKMouseEvent) {
    mouseDispatch(e as SKMouseEvent, root);
  }
});

startSimpleKit();
