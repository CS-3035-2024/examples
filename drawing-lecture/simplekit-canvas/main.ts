import { startSimpleKit, setSKDrawCallback } from "simplekit/canvas-mode";

startSimpleKit();

setSKDrawCallback((gc) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const demo = urlParams.get("demo");

  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);

  gc.fillRect(50, 50, 50, 50);

  // demos
  if (demo === "rectangle") rectangleDemo(gc);
  else if (demo === "path") pathDemo(gc);
  else if (demo === "pathHouse") pathHouseDemo(gc);
  else if (demo === "text") textDemo(gc);
  else if (demo === "colour") colourDemo(gc);
  else if (demo === "state") saveStateDemo(gc);
  else if (demo === "fps") fpsDemo(gc);
});

function rectangleDemo(gc: CanvasRenderingContext2D) {
  gc.fillStyle = "red";
  gc.fillRect(70, 10, 50, 50);

  gc.strokeStyle = "blue";
  gc.strokeRect(80, 20, 50, 50);

  // stacking to make more complex shapes
  gc.lineWidth = 3;
  gc.fillRect(150, 20, 50, 50);
  gc.strokeRect(150, 20, 50, 50);

  // has no effect
  gc.strokeStyle = "green";
}

function pathDemo(gc: CanvasRenderingContext2D) {
  gc.lineWidth = 3;

  // line
  gc.strokeStyle = "black";
  gc.beginPath();
  gc.moveTo(10, 10);
  gc.lineTo(60, 60);
  gc.stroke();

  // polyline or polygon
  gc.strokeStyle = "green";
  gc.beginPath();
  gc.moveTo(100, 10);
  gc.lineTo(150, 60);
  gc.lineTo(100, 60);
  gc.closePath(); // try commenting out
  gc.stroke();

  // circle using ellipse
  gc.strokeStyle = "blue";
  gc.beginPath();
  gc.ellipse(200, 30, 25, 25, 0, 0, 2 * Math.PI);
  gc.stroke();

  // circle using arc
  gc.strokeStyle = "red";
  gc.beginPath();
  gc.arc(200, 30, 20, 0, 2 * Math.PI);
  gc.stroke();
}

//#region pathHouseDemo

// array
const housePoints = [
  [40, 0],
  [80, 40],
  [80, 100],
  [0, 100],
  [0, 40],
];

function pathHouseDemo(gc: CanvasRenderingContext2D) {
  gc.lineWidth = 3;
  gc.strokeStyle = "red";

  gc.beginPath();
  housePoints.forEach((p) => {
    const [x, y] = p;
    gc.lineTo(x, y);
    console.log(`${x}, ${y}`);
  });
  gc.closePath();
  gc.stroke();
}

//#endregion

function textDemo(gc: CanvasRenderingContext2D) {
  const x = 150;
  const y = 75;

  // string uses same style as CSS font property
  gc.font = "32pt sans-serif";
  // standard alignment
  gc.textAlign = "left";
  gc.textBaseline = "alphabetic";
  gc.fillStyle = "blue";
  gc.fillText("Hello", x, y);

  // fully centred alignment
  gc.textAlign = "center";
  gc.textBaseline = "middle";
  gc.fillStyle = "green";
  gc.fillText("Hello", x, y);

  // dot to show x,y location
  gc.fillStyle = "red";
  gc.fillRect(x - 2, y - 2, 4, 4);
}

function colourDemo(gc: CanvasRenderingContext2D) {
  for (let i = 0; i < 10; i++) {
    const h = Math.random() * 360;
    gc.fillStyle = `hsl(${h}deg 80% 50%)`;
    gc.fillRect(i * 20, 20, 20, 20);
  }
}

function saveStateDemo(gc: CanvasRenderingContext2D) {
  // local function to draw a circle
  const circle = (x: number, y: number) => {
    gc.beginPath();
    gc.arc(x, y, 25, 0, Math.PI * 2);
    gc.fill();
    gc.stroke();
  };

  gc.fillStyle = "blue";
  gc.strokeStyle = "red";
  gc.lineWidth = 5;
  circle(50, 50);

  gc.save();

  gc.fillStyle = "yellow";
  gc.strokeStyle = "black";
  gc.lineWidth = 2;
  circle(110, 50);

  gc.restore();

  circle(170, 50);
}

//#region fpsDemo

let frame = 0;
let lastTime = 0;
let fps = 60;

function fpsDemo(gc: CanvasRenderingContext2D) {
  gc.font = "32pt sans-serif";
  fps = 0.98 * fps + 0.02 * Math.round(1000 / (performance.now() - lastTime));
  gc.fillText(`${fps.toFixed(1)} ${frame++}`, 10, 50);
  lastTime = performance.now();
}
//#endregion
