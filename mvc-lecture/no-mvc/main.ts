import {
  startSimpleKit,
  setSKRoot,
  SKButton,
  SKContainer,
  SKLabel,
  Layout,
} from "../../simplekit/src/imperative-mode";

// data
let counter = 0;

// user interface

// root container
const root = new SKContainer();
root.id = "root";
root.fill = "whitesmoke";
root.layoutMethod = Layout.makeFillRowLayout();
// root.debug = true;

// centred panel
const panel = new SKContainer();
panel.margin = 50;
panel.fillWidth = 1;
panel.fillHeight = 1;
// panel.debug = true;

root.addChild(panel);

// left side of panel
const left = new SKContainer();
left.id = "left";
left.fill = "white";
left.border = "grey";
left.padding = 10;
left.fillWidth = 1;
left.fillHeight = 1;
left.layoutMethod = Layout.makeCentredLayout();

// right side of panel
const right = new SKContainer();
right.id = "right";
right.fill = "white";
right.border = "grey";
right.padding = 10;
right.fillWidth = 1;
right.fillHeight = 1;
right.layoutMethod = Layout.makeWrapRowLayout({ gap: 10 });

panel.layoutMethod = Layout.makeFillRowLayout({ gap: 50 });
panel.addChild(left);
panel.addChild(right);

// button
const button = new SKButton({ text: counter.toString() });
button.width = 100;
left.addChild(button);

// set an event handler for button "action" event
button.addEventListener("action", () => {
  counter++;
  button.text = counter.toString();
  visualizeCounter();
});

function visualizeCounter() {
  right.clearChildren();
  for (let i = 0; i < counter; i++) {
    const label = new SKLabel({ text: `${i + 1}` });
    label.fill = "pink";
    label.padding = 15;
    right.addChild(label);
  }
}

visualizeCounter();

setSKRoot(root);

startSimpleKit();
