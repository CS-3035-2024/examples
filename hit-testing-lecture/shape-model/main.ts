// simplekit
import {
  SKMouseEvent,
  SKResizeEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
} from "../../simplekit/src/canvas-mode";
import { point } from "../../simplekit/src/utility";
// local
import { Shape } from "./shape";
import { Rectangle } from "./rectangle";
import { Polygon } from "./polygon";

// very basic display list of Shape objects
const shapes: Shape[] = [];

// polygon points, use map to translate them
const polyPoints = [
  point(0.0, 150.0),
  point(100.0, 150.0),
  point(100.0, 50.0),
  point(50.0, 0.0),
  point(0.0, 50.0),
].map((p) => point((p.x += 10), (p.y += 10)));

const polygon = new Polygon(polyPoints);
polygon.fill = "";
polygon.strokeWidth = 10;
shapes.push(polygon);

const rectangle = new Rectangle(150, 100, 80, 60);
rectangle.stroke = "";
rectangle.fill = "black";
shapes.push(rectangle);

const rectangle2 = new Rectangle(250, 100, 80, 60);
rectangle2.fill = "";
rectangle2.strokeWidth = 10;
shapes.push(rectangle2);

let width = 0;
let height = 0;

// mouse position
let mx = 0;
let my = 0;

// handle event
setSKEventListener((e) => {
  switch (e.type) {
    case "mousemove":
      ({ x: mx, y: my } = e as SKMouseEvent);
      shapes.forEach((s) => {
        if (s instanceof Shape) {
          if (s.hitTest(mx, my)) {
            if (s.isFilled) s.fill = "red";
            if (s.isStroked) s.stroke = "red";
          } else {
            if (s.isFilled) s.fill = "black";
            if (s.isStroked) s.stroke = "black";
          }
        }
      });
      break;
    case "resize":
      const re = e as SKResizeEvent;
      width = re.width;
      height = re.height;
      break;
  }
});

// draw shapes
setSKDrawCallback((gc) => {
  // clear background
  gc.clearRect(0, 0, width, height);

  shapes.forEach((s) => {
    s.draw(gc);
  });

  // domHitTests(gc);
});

startSimpleKit();

// built-in Canvas API hit test
// MAY NOT BE ALLOWED ON ASSIGNMENTS, CHECK LIMITATIONS
// @ts-ignore (noUnusedLocals)
function domHitTests(gc: CanvasRenderingContext2D) {
  gc.beginPath();
  gc.rect(250, 200, 80, 60);
  const hitFill = gc.isPointInPath(mx, my);
  gc.fillStyle = hitFill ? "blue" : "grey";
  gc.fill();
  gc.lineWidth = 20;
  const hitStroke = gc.isPointInStroke(mx, my);
  gc.strokeStyle = hitStroke ? "red" : "black";
  gc.stroke();
}
