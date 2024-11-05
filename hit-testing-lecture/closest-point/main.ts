import {
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
  SKMouseEvent,
  SKResizeEvent,
} from "../../simplekit/src/canvas-mode";

import { Point2, point, random } from "../../simplekit/src/utility";

import { closestPoint } from "./closest-point";

// state to track canvas size
let width = 0;
let height = 0;

function randomPoint(): Point2 {
  const m = 50; // keep points inside this margin from canvas edges
  return point(random(m, width - m), random(m, height - m));
}

// points to test and render in demo
let P0: Point2 = point(0, 0); // line segment start
let P1: Point2 = point(0, 0); // line segment end
let M: Point2 = point(0, 0); // mouse point
let Q: Point2 = point(0, 0); // closest point on line segment
let QInf: Point2 = point(0, 0); // closest point on infinite line

// handle events
setSKEventListener((e) => {
  switch (e.type) {
    case "mousemove":
      const { x, y } = e as SKMouseEvent;
      M.x = x;
      M.y = y;
      Q = closestPoint(M, P0, P1);
      QInf = closestPoint(M, P0, P1, false);
      break;
    case "click":
      // new random line
      P0 = randomPoint();
      P1 = randomPoint();
      break;
    case "resize":
      const re = e as SKResizeEvent;
      // update local canvas size state
      // (SimpleKit always sends resize event before first draw)
      width = re.width;
      height = re.height;
      // new random line
      P0 = randomPoint();
      P1 = randomPoint();
      break;
  }
});

// draw line and closest point
setSKDrawCallback((gc) => {
  // clear background
  gc.clearRect(0, 0, width, height);

  // line
  gc.beginPath();
  gc.moveTo(P0.x, P0.y);
  gc.lineTo(P1.x, P1.y);
  gc.lineWidth = 2;
  gc.strokeStyle = "black";
  gc.stroke();

  // mouse point
  gc.beginPath();
  gc.arc(M.x, M.y, 10, 0, Math.PI * 2);
  gc.strokeStyle = "blue";
  gc.stroke();

  // closest point on infinite line
  gc.beginPath();
  gc.arc(QInf.x, QInf.y, 10, 0, Math.PI * 2);
  gc.strokeStyle = "pink";
  gc.stroke();

  // closest point on line segment
  gc.beginPath();
  gc.arc(Q.x, Q.y, 10, 0, Math.PI * 2);
  gc.strokeStyle = "red";
  gc.stroke();
});

startSimpleKit();
