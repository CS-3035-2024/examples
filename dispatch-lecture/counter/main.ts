import {
  startSimpleKit,
  setSKRoot,
  SKButton,
  SKTextfield,
  SKContainer,
} from "../../simplekit/src/imperative-mode";

let counter = 0;

// create widgets
const root = new SKContainer({
  x: 10,
  y: 10,
  width: 300,
  height: 300,
});
const increaseButton = new SKButton({
  text: "Increase",
  x: 30,
  y: 30,
  width: 100,
});
const textfield = new SKTextfield({
  text: "0",
  x: 30,
  y: 80,
  width: 100,
});
const clearButton = new SKButton({
  text: "Clear",
  x: 30,
  y: 150,
  width: 100,
});

// build widget tree
root.addChild(increaseButton);
root.addChild(textfield);
root.addChild(clearButton);

// set up event listeners
increaseButton.addEventListener("action", (e) => {
  console.log("incrementButton action!");
  counter++;
  textfield.text = counter.toString();
});

clearButton.addEventListener("action", (e) => {
  console.log("clearButton action!");
  counter = 0;
  textfield.text = counter.toString();
});

textfield.addEventListener("textchanged", (e) => {
  const tf = e.source as SKTextfield;
  console.log(`textfield textchanged '${tf.text}'`);
  tf.text = tf.text.replace(/[^0-9]/g, ""); // simple text validation
  counter = parseInt(tf.text) || 0; // convert to number for counter
});

// all SimpleKit needs is the root element
setSKRoot(root);

startSimpleKit();
