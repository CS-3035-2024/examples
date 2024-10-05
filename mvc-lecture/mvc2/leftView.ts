import {
  SKButton,
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class LeftView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    this.button.text = `${this.model.count}`;
  }

  //#endregion

  button: SKButton = new SKButton({ text: "?" });

  constructor(private model: Model) {
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

    // this is the Controller
    this.button.addEventListener("action", () => {
      model.increment();
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
