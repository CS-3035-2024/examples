import {
    startSimpleKit,
    setSKRoot,
    SKContainer,
    Layout,
} from "../simplekit/src/imperative-mode";
import { Model } from "./model";
import { ViewTop } from "./viewTop";
import { ViewBottom } from "./viewBottom";
import { Controller } from "./controller";


// Declare sizes for the main panel
const panelWidth:number = 350;
const panelHeight:number = 500;


// Create the root element
const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = Layout.makeCentredLayout();


// Create the panel
const panel = new SKContainer({ width: panelWidth, height: panelHeight });
panel.fill = "white";
panel.border = "black";
panel.layoutMethod = Layout.makeWrapRowLayout();


// Create the model and view
const model = new Model();
const controller = new Controller();

// Create two different views. Views extend SKContainer
const topView = new ViewTop({ width: panelWidth, height: panelHeight/1.25 });
topView.layoutMethod = Layout.makeWrapRowLayout();

const bottomView = new ViewBottom({ width: panelWidth, height: panelHeight/5 });
bottomView.layoutMethod = Layout.makeCentredLayout();
bottomView.fill = "lightblue";


// Set the model for the controller and views
controller.model = model;
topView.model = model;
bottomView.model = model;

// Add views as subscribers
model.addSubscriber(topView);
model.addSubscriber(bottomView);

// Link view events to the controller
bottomView.setButtonEvent(controller);



root.addChild(panel);
panel.addChild(topView);
panel.addChild(bottomView);

setSKRoot(root);
startSimpleKit();
