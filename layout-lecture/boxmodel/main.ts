import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
} from "../../simplekit/src/imperative-mode";

// global debug flag
// Settings.debug = false;

const root = new SKContainer();
root.id = "ROOT";
root.fill = "white";
root.debug = true;
root.padding = 10;
console.log(`root: ${root.debug}`);

const a = new SKContainer({ x: 30, y: 30, width: 125, height: 75 });
a.margin = 20;
a.padding = 10;
// a.border = "1px solid black";
a.fill = "lightgrey";
// for debug only
a.debug = true;
a.id = "A";
root.addChild(a);

setSKRoot(root);

startSimpleKit();

console.log(a.widthBasis, a.heightBasis);
console.log(a.widthLayout, a.heightLayout);

