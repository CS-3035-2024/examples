import {
  SKMouseEvent,
  SKTextfield,
  SKTextfieldProps,
} from "../../simplekit/src/imperative-mode";

import { requestKeyboardFocus } from "./dispatch-keyboard";

export class SKTextfieldDemo extends SKTextfield {
  constructor(props: SKTextfieldProps) {
    super(props);

    // force layout recalculation for this demo
    this.calculateBasis();
    this.doLayout();
  }

  handleMouseEvent(me: SKMouseEvent) {
    switch (me.type) {
      case "mouseenter":
        this.state = "hover";
        return true;
        break;
      case "mouseexit":
        this.state = "idle";
        return true;
        break;
      case "click":
        requestKeyboardFocus(this);
        return true;
        break;
      case "mousedown":
        return false;
        break;
      case "mouseup":
        return false;
        break;
    }
    return false;
  }
}
