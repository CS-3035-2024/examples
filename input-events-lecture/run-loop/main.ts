// creates very basic UI Toolkit run loop

import {
  FundamentalEvent,
  createWindowingSystem,
} from "../../simplekit/src/windowing-system";

// this is a very simple UI toolkit run loop
function runLoop(eventQueue: FundamentalEvent[], time: number) {
  // log all fundamental events in the queue
  while (eventQueue.length > 0) {
    const e = eventQueue.shift();
    if (!e) continue;

    console.log(e);
  }

  // many other UI toolkit things in here ...
}

// create the simulated windowing system with
// this UI Toolkit run loop
createWindowingSystem(runLoop);
