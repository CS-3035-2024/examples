import {
  SKContainer,
  SKEvent,
  SKMouseEvent,
  setSKEventListener,
  setSKRoot,
  startSimpleKit,
} from "../simplekit/src/imperative-mode";


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
      squareSize += 2;
      square.height = squareSize;
      square.width = squareSize;
      break;
    case "dblclick":
      squareSize = 50;
      square.height = squareSize;
      square.width = squareSize;
      break;
    case "keydown":
      square.fill = "pink";
      break;
  }
}


const root = new SKContainer();
root.fill = "lightgrey";

let squareSize:number = 50;
const square = new SKContainer({height:squareSize, width:squareSize})

root.addChild(square);


// set the event handler
setSKEventListener(handleEvent);
setSKRoot(root);

// start SimpleKit
startSimpleKit();