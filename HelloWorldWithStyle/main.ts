/**
 * This is a simple example of how to create a label element and display it and change
 * the default style of the label.
 */
import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKLabel,
  Layout,
} from "simplekit/imperative-mode";

// Creating a new container for the root element
const root = new SKContainer();

// Create a label
var label = new SKLabel({ text: "Hello World!" });

// Set the style of the label... you can see what properties are available in the SimpleKit style.ts file
label.fill = "lightblue";
label.border = "black";
label.font = "12pt serif";
// label.height = 50;
// label.width = 200;

// Apply a layout to root
root.layoutMethod = Layout.makeCentredLayout();

// Adding the label element as a child of root
root.addChild(label);

// Set the root element and start SimpleKit
setSKRoot(root);
startSimpleKit();
