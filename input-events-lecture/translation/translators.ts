import { distance } from "../../simplekit/src/utility";

// the simulated "raw" events from "window manager"
import { FundamentalEvent } from "../../simplekit/src/windowing-system";

// simulated UI Toolkit events
import {
  SKEvent,
  SKKeyboardEvent,
  SKMouseEvent,
  SKResizeEvent,
} from "../../simplekit/src/canvas-mode";

export type EventTranslator = {
  update: (fe: FundamentalEvent) => SKEvent | undefined;
};

export const fundamentalTranslator = {
  update(fe: FundamentalEvent): SKEvent {
    switch (fe.type) {
      case "mousedown":
      case "mouseup":
      case "mousemove":
        return new SKMouseEvent(
          fe.type,
          fe.timeStamp,
          fe.x || 0,
          fe.y || 0
        );
        break;
      case "keydown":
      case "keyup":
        return new SKKeyboardEvent(fe.type, fe.timeStamp, fe.key);
        break;
      case "resize":
        return new SKResizeEvent(
          fe.type,
          fe.timeStamp,
          document.body.clientWidth,
          document.body.clientHeight
          // window.innerWidth,
          // window.innerHeight
        );
      default:
        return new SKEvent(fe.type, fe.timeStamp);
    }
  },
};

export const clickTranslator = {
  state: "IDLE",
  // parameters for transitions
  movementThreshold: 50,
  timeThreshold: 800, // milliseconds
  // for tracking thresholds
  startX: 0,
  startY: 0,
  startTime: 0,

  // returns a click event if found
  update(fe: FundamentalEvent): SKMouseEvent | undefined {
    switch (this.state) {
      case "IDLE":
        if (fe.type == "mousedown") {
          this.state = "DOWN";
          this.startX = fe.x || 0;
          this.startY = fe.y || 0;
          this.startTime = fe.timeStamp;
        }
        break;

      case "DOWN":
        if (fe.timeStamp - this.startTime > this.timeThreshold) {
          this.state = "IDLE";
        } else if (
          fe.x &&
          fe.y &&
          distance(fe.x, fe.y, this.startX, this.startY) >
            this.movementThreshold
        ) {
          this.state = "IDLE";
        } else if (fe.type == "mouseup") {
          this.state = "IDLE";
          return new SKMouseEvent(
            "click",
            fe.timeStamp,
            fe.x || 0,
            fe.y || 0
          );
        }
        break;
    }
    return;
  },
};

export const dblclickTranslator = {
  // internal click translator for dblclick
  // note this is a copy of main clickTranslator object
  internalClickTranslator: { ...clickTranslator },

  state: "IDLE",
  // parameters for transitions
  timeThreshold: 500, // milliseconds
  // for tracking thresholds
  startTime: 0,

  // returns a dblclick event if found
  // needs a click event as well, the fe event is for time
  update(fe: FundamentalEvent): SKMouseEvent | undefined {
    // update internal clickTranslator
    const e = this.internalClickTranslator.update(fe);

    switch (this.state) {
      case "IDLE":
        if (e && e.type == "click") {
          this.state = "READY";
          this.startTime = e.timeStamp;
        }
        break;

      case "READY":
        if (fe.timeStamp - this.startTime > this.timeThreshold) {
          this.state = "IDLE";
        } else if (e && e.type == "click") {
          this.state = "IDLE";
          return new SKMouseEvent(
            "dblclick",
            fe.timeStamp,
            fe.x || 0,
            fe.y || 0
          );
        }
        break;
    }
    return;
  },
};

export const dragTranslator = {
  state: "IDLE",
  // parameters for transitions
  movementThreshold: 50,
  // for tracking thresholds
  startX: 0,
  startY: 0,

  // returns a drag event if found
  update(fe: FundamentalEvent): SKMouseEvent | undefined {
    switch (this.state) {
      case "IDLE":
        if (fe.type == "mousedown") {
          this.state = "DOWN";
          this.startX = fe.x || 0;
          this.startY = fe.y || 0;
        }
        break;

      case "DOWN":
        if (fe.type == "mouseup") {
          this.state = "IDLE";
        } else if (
          fe.type == "mousemove" &&
          fe.x &&
          fe.y &&
          distance(fe.x, fe.y, this.startX, this.startY) >
            this.movementThreshold
        ) {
          this.state = "DRAG";
          return {
            type: "dragstart",
            timeStamp: fe.timeStamp,
            x: fe.x,
            y: fe.y,
          } as SKMouseEvent;
        }

        break;

      case "DRAG":
        if (fe.type == "mousemove") {
          return {
            type: "drag",
            timeStamp: fe.timeStamp,
            x: fe.x,
            y: fe.y,
          } as SKMouseEvent;
        } else if (fe.type == "mouseup") {
          this.state = "IDLE";
          return {
            type: "dragend",
            timeStamp: fe.timeStamp,
            x: fe.x,
            y: fe.y,
          } as SKMouseEvent;
        }

        break;
    }
    return;
  },
};
