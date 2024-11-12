import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
  Layout,
} from "../../simplekit/src/imperative-mode";

import { random } from "../../simplekit/src/utility";

// helper function to make a container
function makeContainer(id: string, fill: string): SKContainer {
  const container = new SKContainer();
  container.id = id;
  container.fill = fill;
  return container;
}

const root = makeContainer("root", "lightyellow");
root.padding = 10;
// root.debug = true;

for (let i = 0; i < 10; i++) {
  const a = makeContainer(`${i + 1}`, "lightblue");
  a.padding = 10;
  a.margin = 10;
  a.x = 50;
  a.y = 50;
  a.width = random(50, 150);
  a.height = random(50, 100);
  a.debug = true;

  root.addChild(a);
}

// set layout method
root.layoutMethod = Layout.makeWrapRowLayout({ gap: 10 });

setSKRoot(root);

startSimpleKit();
