console.log("dispatch/src/propagation/main.ts");

import {
  startSimpleKit,
  setSKDrawCallback,
  setSKEventListener,
  SKMouseEvent,
  SKElement,
  SKContainer,
} from "simplekit/imperative-mode";

// this will be the "root" of the UI widget tree
const redContainer = new SKContainer({
  x: 20,
  y: 20,
  width: 140,
  height: 140,
});
redContainer.fill = "red";

const orangeContainer = new SKContainer({
  x: 20,
  y: 20,
  width: 100,
  height: 100,
});
orangeContainer.fill = "orange";

const yellowContainer = new SKContainer({
  x: 20,
  y: 20,
  width: 60,
  height: 60,
});
yellowContainer.fill = "yellow";

yellowContainer.addEventListener("action", (e) => {
  console.log("🟨 yellow action");
  return false; // return true to stop propagation
});

redContainer.addEventListener(
  "action",
  (e) => {
    console.log("🟥 red action");
    return false; // return true to stop propagation
  },
  true // sets event type to capture
);

redContainer.addChild(orangeContainer);
orangeContainer.addChild(yellowContainer);

setSKDrawCallback((gc) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  redContainer.draw(gc); // draw from root
});

setSKEventListener((e) => {
  if (e.type == "click") {
    console.log("- - - - - - - - - - -");
    dispatch(e as SKMouseEvent, redContainer);
  }
});

startSimpleKit();

// returns route from root to all elements under mouse
// (from back to front)
function buildTargetRoute(
  mx: number,
  my: number,
  element: SKElement
): SKElement[] {
  const route: SKElement[] = [];
  // only SKContainers have children to traverse
  if (element instanceof SKContainer) {
    (element as SKContainer).children.forEach((child) =>
      route.push(
        ...buildTargetRoute(
          // translate to child coord system
          mx - element.x,
          my - element.y,
          child
        )
      )
    );
  }
  // console.log(`? ${element.toString()}`);
  if (element.hitTest(mx, my)) {
    return [element, ...route];
  } else {
    return route;
  }
}

function dispatch(me: SKMouseEvent, root: SKElement) {
  const route = buildTargetRoute(me.x, me.y, root);

  // capture
  const stopPropagation = route.some((element) => {
    console.log(`capture ${element.toString()}`);
    const handled = element.handleMouseEventCapture(me);
    if (handled) console.log("stop propagation");
    return handled;
  });

  if (stopPropagation) return;

  // bubble
  route.reverse().some((element) => {
    console.log(`bubble ${element.toString()}`);
    const handled = element.handleMouseEvent(me);
    if (handled) console.log("stop propagation");
    return handled;
  });
}
