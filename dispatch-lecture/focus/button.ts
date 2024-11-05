import {
  SKButton,
  SKButtonProps,
  SKEvent,
  SKMouseEvent,
} from "simplekit/imperative-mode";

import { requestMouseFocus } from "./dispatch-mouse";

export class SKButtonDemo extends SKButton {
  constructor(props: SKButtonProps) {
    super(props);
  }

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mousedown":
        this.state = "down";
        // created this subclass to demo requestMouseFocus
        requestMouseFocus(this);
        return true;
        break;
      case "mouseup":
        this.state = "hover";
        // return true if a listener was registered
        return this.sendEvent({
          source: this,
          timeStamp: me.timeStamp,
          type: "action",
        } as SKEvent);
        break;
      case "mouseenter":
        this.state = "hover";
        return true;
        break;
      case "mouseexit":
        this.state = "idle";
        return true;
        break;
    }
    return false;
  }
}
