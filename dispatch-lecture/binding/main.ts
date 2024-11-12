import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKButton,
} from "../../simplekit/src/imperative-mode";

const button = new SKButton({
  text: "Button",
  x: 30,
  y: 30,
  width: 100,
});

button.addEventListener("action", (e) => {
  console.log("button was clicked! 🤯");
});

// fake the toolkit event dispatch through tree,
// just send the event directly to button
setSKEventListener((e) => {
  if (e.type == "mouseup") {
    const me = e as SKMouseEvent;
    if (button.hitTest(me.x, me.y)) {
      button.handleMouseEvent(me);
    }
  }
});

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  button.draw(gc);
});

startSimpleKit();
