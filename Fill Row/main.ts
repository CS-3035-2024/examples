import {
    startSimpleKit,
    setSKRoot,
    SKContainer,
    Layout,
} from "../simplekit/src/imperative-mode";

const panelWidth = 500;
const panelHeight = 220;


// Creating the root element with a grey background. No layout has been set, default is fixed
const root = new SKContainer();
root.fill = "lightgrey";



// Creating a white panel that will be a child of root
const panel = new SKContainer({ width: panelWidth, height: panelHeight });
panel.fill = "white";
panel.border = "black";
panel.layoutMethod = Layout.makeFillRowLayout( {gap: 20} ); // Setting the layout to fill row. Gap property creates gaps between other elements



// Creating three different containers that will be children of panel
// Even though we have 3 containers, we want them to take up a total of 4 spots. As a ratio, two containers will take 1 of 4 spots, the final container will take up 2
// fillHeight is set to 1 to take up the total space
const container = new SKContainer();
container.fill = "red";
container.fillWidth = panelWidth/4;
container.fillHeight = 1;

const container2 = new SKContainer();
container2.fill = "green";
container2.fillWidth = panelWidth/4;
container2.fillHeight = 1;

const container3 = new SKContainer();
container3.fill = "blue";
container3.fillWidth = panelWidth/2;
container3.fillHeight = 1;



// Add panel as a child of root
root.addChild(panel);

// Add the containers as children of panel
panel.addChild(container);
panel.addChild(container2);
panel.addChild(container3);

// Set the root and start SimpleKit
setSKRoot(root);
startSimpleKit();