import {
  SKElement,
  SKKeyboardEvent,
} from "simplekit/imperative-mode";

const debug = true;

if (debug) console.log("load dispatch-keyboard module");

let focusedElement: SKElement | null = null;

export function requestKeyboardFocus(element: SKElement) {
  // nothing to do if already focused
  if (focusedElement == element) return;
  // if send focusout to old element if there was one
  if (focusedElement) {
    focusedElement.handleKeyboardEvent({
      type: "focusout",
      timeStamp: performance.now(),
      key: null,
    } as SKKeyboardEvent);
    if (debug) console.log(`lost keyboard focus ${focusedElement}`);
  }
  // send focus in to new element
  element.handleKeyboardEvent({
    type: "focusin",
    timeStamp: performance.now(),
    key: null,
  } as SKKeyboardEvent);
  focusedElement = element;
  if (debug) console.log(`gained keyboard focus ${focusedElement}`);
}

/**
 * Dispatch keyboard event to focused element
 * @param ke event to dispatch
 */
export function keyboardDispatch(ke: SKKeyboardEvent) {
  if (debug)
    console.log(
      `keyboardDispatch ${ke} ${focusedElement || "no focus"}`
    );
  focusedElement?.handleKeyboardEvent(ke);
}
