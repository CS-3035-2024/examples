import {
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Observer } from "./observer";
import { Model } from "./model";

export class RightView extends SKContainer implements Observer {
  //#region observer pattern

  update(): void {
    this.clearChildren();

    for (let i = 0; i < this.model.count; i++) {
      const label = new SKLabel({ text: `${i + 1}` });
      label.fill = "lightgreen";
      label.padding = 15;
      this.addChild(label);
    }
  }

  //#endregion

  constructor(private model: Model) {
    super();

    // setup the view
    this.id = "right";
    this.fill = "white";
    this.border = "grey";
    this.padding = 10;
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.layoutMethod = Layout.makeWrapRowLayout({ gap: 10 });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
