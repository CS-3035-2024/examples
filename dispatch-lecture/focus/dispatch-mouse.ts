// returns route from root to all elements under mouse

import {
  SKContainer,
  SKElement,
  SKMouseEvent,
} from "simplekit/imperative-mode";

const debug = true;

if (debug) console.log("load dispatch-mouse module");

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

export function mouseDispatch(me: SKMouseEvent, root: SKElement) {
  // focus dispatch
  if (focusedElement) {
    focusedElement.handleMouseEvent(me);
    if (me.type == "mouseup") {
      if (debug) console.log(`lost mouse focus ${focusedElement}`);
      focusedElement = null;
    }
    return;
  }

  const route = buildTargetRoute(me.x, me.y, root);

  // update mouseenter/mouseexit
  if (me.type == "mousemove") {
    const topElement = route.slice(-1)[0];
    updateEnterExit(me, topElement);
  }

  // capture
  const stopPropagation = !route.every((element) => {
    const handled = element.handleMouseEventCapture(me);
    return !handled;
  });

  if (stopPropagation) return;

  // bubble
  route.reverse().every((element) => {
    const handled = element.handleMouseEvent(me);
    return !handled;
  });
}

// last element entered by mouse
let lastElementEntered: SKElement | undefined;

// dispatch mouseenter/mouseexit with element mouse is on
function updateEnterExit(me: SKMouseEvent, el?: SKElement) {
  if (el != lastElementEntered) {
    if (lastElementEntered) {
      if (debug) console.log(`exit ${lastElementEntered}`);
      lastElementEntered.handleMouseEvent({
        ...me,
        type: "mouseexit",
      });
    }
    if (el) {
      if (debug) console.log(`enter ${el}`);
      el.handleMouseEvent({ ...me, type: "mouseenter" });
    }
    lastElementEntered = el;
  }
}

// mouse focus
let focusedElement: SKElement | null = null;

export function requestMouseFocus(element: SKElement) {
  if (focusedElement == element) return;
  focusedElement = element;
  if (debug) console.log(`gained mouse focus ${focusedElement}`);
}
