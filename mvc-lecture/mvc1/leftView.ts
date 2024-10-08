import {
  SKButton,
  SKContainer,
  Layout,
} from "../../simplekit/src/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";
import { LeftController } from "./leftController";

export class LeftView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    this.button.text = `${this.model.count}`;
  }

  //#endregion

  button: SKButton = new SKButton({ text: "?" });

  constructor(private model: Model, controller: LeftController) {
    super();

    // setup the view
    this.id = "left";
    this.fill = "white";
    this.border = "grey";
    this.padding = 10;
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.layoutMethod = Layout.makeCentredLayout();

    // add a button to the view
    this.button.width = 100;
    this.addChild(this.button);

    // set an event handler for button "action" event
    this.button.addEventListener("action", () => {
      controller.handleButtonPress();
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
