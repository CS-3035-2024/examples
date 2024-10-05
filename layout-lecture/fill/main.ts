import {
  Settings,
  SKContainer,
  startSimpleKit,
  setSKRoot,
  Layout,
} from "simplekit/imperative-mode";

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
// a.margin = 20;
a.padding = 10;
a.width = 100;
a.height = 100;
// a.fillWidth = 1;
a.debug = true;

root.addChild(a);

const b = makeContainer("B", "pink");
// b.margin = 20;
b.padding = 10;
b.width = 100;
b.height = 100;
b.fillWidth = 1;
b.debug = true;

root.addChild(b);

const c = makeContainer("C", "lightgreen");
// c.margin = 20;
c.padding = 10;
c.width = 100;
c.height = 100;
// c.fillWidth = 1;
// c.fillHeight = 1;
c.debug = true;

root.addChild(c);

// set layout method
root.layoutMethod = Layout.makeFillRowLayout({ gap: 10 });

setSKRoot(root);

startSimpleKit();
