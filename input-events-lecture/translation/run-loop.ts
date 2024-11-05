// the simulated "raw" events from "window manager"
import {
  createWindowingSystem,
  FundamentalEvent,
} from "../../simplekit/src/windowing-system";

// simulated UI Toolkit events
import { SKEvent } from "../../simplekit/src/canvas-mode";

// event translators for this demo
import {
  EventTranslator,
  fundamentalTranslator,
  clickTranslator,
  dblclickTranslator,
  dragTranslator,
} from "./translators";

// Coalesces some fundamental events into a single event of
// the same type (it mutates the list)
function coalesceEvents(
  events: FundamentalEvent[],
  eventTypes = ["mousemove", "resize"]
) {
  const original = [...events];
  events.length = 0;
  original.forEach((e) => {
    if (e.type in eventTypes) {
      const i = events.findIndex((ee) => ee.type in eventTypes);
      if (i > -1) {
        events[i] = e;
      } else {
        events.push(e);
      }
    } else {
      events.push(e);
    }
  });
}

export function runLoop(
  eventQueue: FundamentalEvent[],
  time: number
) {
  // fundamental event queue coalescing
  coalesceEvents(eventQueue);

  // list of toolkit events to dispatch
  let events: SKEvent[] = [];

  // translate fundamental events to toolkit events
  while (eventQueue.length > 0) {
    const fundamentalEvent = eventQueue.shift();
    if (!fundamentalEvent) continue;

    translators.forEach((t) => {
      const translatedEvent = t.update(fundamentalEvent);
      if (translatedEvent) {
        events.push(translatedEvent);
      }
    });
  }

  // global dispatch all events
  if (eventListener) events.forEach((e) => eventListener(e));

  // now tell application to redraw
  if (drawCallback) drawCallback(gc);
}

// event listener callback fo toolkit apps
export function setEventListener(listener: EventListener) {
  eventListener = listener;
}
type EventListener = (e: SKEvent) => void;
let eventListener: EventListener;

// draw callback for toolkit apps
export function setDrawCallback(draw: DrawCallback) {
  drawCallback = draw;
}
type DrawCallback = (gc: CanvasRenderingContext2D) => void;
let drawCallback: DrawCallback;

const translators: EventTranslator[] = [
  fundamentalTranslator,
  clickTranslator,
  dblclickTranslator,
  dragTranslator,
];

export function addEventTranslator(translator: EventTranslator) {
  translators.push(translator);
  console.log(
    `added event translator, now ${translators.length} translators`
  );
}

// save the canvas context for the draw callback
let gc: CanvasRenderingContext2D;

export function startRunLoop() {
  console.log(`start run loop`);

  // create a canvas and add it to the document body
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  // set a background style to make it easier to see the canvas
  canvas.style.setProperty("background", "whitesmoke");

  // save graphics context to local module variable
  const graphicsContext = canvas.getContext("2d");
  // this should never happen, but we need to check
  if (!graphicsContext) {
    console.error("Unable to get graphics context from canvas");
    return false;
  }
  gc = graphicsContext;

  // create the simulated windowing system with run loop
  createWindowingSystem(runLoop);
}
