import { startSimpleKit, setSKDrawCallback } from "simplekit/canvas-mode";

startSimpleKit();

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const demo = urlParams.get("demo");

  // demos
  if (demo === "square") squareDemo(gc);
  else if (demo === "painters") paintersDemo(gc);
  else if (demo === "displayList") displayListDemo(gc);
});

//#region squareDemo
import { Square1, Square2 } from "./square";

const redSquare = new Square1(50, 50, 50);
const blueSquare = new Square1(250, 50, 50);
const square = new Square1(150, 50, 50);

function squareDemo(gc: CanvasRenderingContext2D) {
  gc.save();
  gc.fillStyle = "pink";
  gc.strokeStyle = "red";
  gc.lineWidth = 3;
  redSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "lightblue";
  gc.strokeStyle = "blue";
  gc.lineWidth = 3;
  blueSquare.draw(gc);
  gc.restore();

  gc.save();
  gc.fillStyle = "grey";
  square.draw(gc);
  gc.restore();
}
//#endregion

//#region paintersDemo
import { Cat } from "./cat";

const square2 = new Square2(100, 75, 100, "black");
const cat = new Cat(50, 100);

function paintersDemo(gc: CanvasRenderingContext2D) {
  square2.draw(gc);
  cat.draw(gc);
}
//#endregion

//#region displayListDemo

import { DisplayList } from "./displaylist";

const displayList = new DisplayList();

const cat2 = new Cat(100, 60);
displayList.add(cat2);

displayList.add(new Square2(60, 50, 50, "red", "black", 3));
displayList.add(new Square2(140, 50, 50, "blue", "black", 3));

//#region random objects
if (false) {
  // useful for generating random numbers
  function random(lower: number, upper: number) {
    return lower + Math.random() * (upper - lower);
  }

  for (let i = 0; i < 10; i++) {
    const w = random(25, 50);
    const x = random(25, 250 - w);
    const y = random(25, 150 - w);
    displayList.add(new Square2(x, y, w, "green", "black", 3));
  }
}
//#endregion

// move shape to front
// displayList.remove(cat2);
// displayList.add(cat2);

function displayListDemo(gc: CanvasRenderingContext2D) {
  displayList.draw(gc);
}

//#endregion
