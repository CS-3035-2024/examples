import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
} from "../../simplekit/src/imperative-mode";

// local imports
import { Model } from "./model";
import { LeftView } from "./leftView";
import { RightView } from "./rightView";

// data
const model = new Model();

// user interface

// root container
const root = new SKContainer();
root.id = "root";
root.fill = "whitesmoke";
root.layoutMethod = Layout.makeFillRowLayout();

// centred panel
const panel = new SKContainer();
panel.margin = 50;
panel.fillWidth = 1;
panel.fillHeight = 1;

root.addChild(panel);

// add views to main panel
panel.layoutMethod = Layout.makeFillRowLayout({ gap: 50 });
panel.addChild(new LeftView(model));
panel.addChild(new RightView(model));

setSKRoot(root);

startSimpleKit();
