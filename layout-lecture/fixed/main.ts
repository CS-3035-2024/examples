import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
  Layout,
} from "../../simplekit/src/imperative-mode";

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

const a = makeContainer("A", "lightblue");
a.padding = 10;
a.x = 50;
a.y = 50;
a.width = 100;
a.height = 50;
a.debug = true;

root.addChild(a);

const b = makeContainer("B", "pink");
b.padding = 10;
b.x = 200;
b.y = 50;
b.width = 50;
b.height = 100;
b.debug = true;

root.addChild(b);

// set layout method
root.layoutMethod = Layout.makeFixedLayout();

setSKRoot(root);

startSimpleKit();
