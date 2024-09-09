/**
 * This is a simple example of how to create a label element and display it on the screen.
 */

import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKLabel,
} from "../simplekit/src/imperative-mode";

// Creating a new container for the root element
const root = new SKContainer();

// Creating label to display text
const label = new SKLabel({ text: "Hello World!" });

// Change the x and y values of the label
// label.x = 500;
// label.y = 75;

// Adding the label element as a child of root
root.addChild(label);

// Set the root element and start SimpleKit
setSKRoot(root);
// setSKRoot(label); // try adding the label as the root element
startSimpleKit();
