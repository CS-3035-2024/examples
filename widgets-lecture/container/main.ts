import {
  startSimpleKit,
  setSKDrawCallback,
} from "../../simplekit/src/imperative-mode";

import { SKButton } from "../button/button";
import { SKContainer } from "./container";

const blueContainer = new SKContainer({
  x: 50,
  y: 20,
  width: 200,
  height: 175,
});
blueContainer.fill = "lightblue";

const buttonB = new SKButton({ text: "B", x: 10, y: 10, width: 80 });
blueContainer.addChild(buttonB);

const greenContainer = new SKContainer({
  x: 20,
  y: 80,
  width: 150,
  height: 75,
});
greenContainer.fill = "lightgreen";

const buttonA = new SKButton({ text: "A", x: 10, y: 10, width: 80 });
greenContainer.addChild(buttonA);

// try adding the green container to the blue container
// (remove the green container form the draw callback too)
// blueContainer.addChild(greenContainer);

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  blueContainer.draw(gc);
  greenContainer.draw(gc);
});

startSimpleKit();
