/**
 * This is a simple example of how to create a simple form with a textfield and a button,
 * and display a message when the button is clicked.
 */
import {
  startSimpleKit,
  setSKRoot,
  SKButton,
  SKContainer,
  SKLabel,
  SKTextfield,
  Layout,
  Settings,
} from "../simplekit/src/imperative-mode";

// global debug flag to visualize box model dimensions
// Settings.debug = true;
// Settings.debugLayout = true;
// Settings.layoutWarning = true;

const root = new SKContainer();
root.padding = 10;
root.fill = "lightgrey";

// fixed size panel in centre
const panel = new SKContainer({ width: 400, height: 110 });
panel.fill = "white";
panel.border = "black";
panel.padding = 20;
panel.layoutMethod = Layout.makeWrapRowLayout({ gap: 10 });
// panel.layoutMethod = Layout.makeFillRowLayout({ gap: 10 }); //try a different layout

root.addChild(panel);
root.layoutMethod = Layout.makeCentredLayout();
// try this too
// root.layoutMethod = Layout.makeFillRowLayout();
// panel.fillWidth = 1;
panel.margin = 50;

// label
const nameInputLabel = new SKLabel({
  text: "Name:",
  align: "right",
  width: 80,
});

const outputLabel = new SKLabel({
  text: "",
  align: "centre",
  width: 300,
});

// texfield
const name = new SKTextfield({ width: 150 });
name.fillWidth = 1;

// button
const hello = new SKButton({ text: "Hello", width: 80 });

// set an event handler for button "action" event
hello.addEventListener("action", () => {
  const msg = name.text == "" ? "Enter a name!" : `Hello ${name.text}`;
  console.log(msg);
  outputLabel.text = msg;
});

// add them to panel
panel.addChild(nameInputLabel);
panel.addChild(name);
panel.addChild(hello);
panel.addChild(outputLabel);

setSKRoot(root);

startSimpleKit();
