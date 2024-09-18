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
//root.padding = 100;



// Creating a white panel that will be a child of root
const panel = new SKContainer( {width: panelWidth, height: panelHeight} );
panel.fill = "white";
panel.border = "black";
panel.layoutMethod = Layout.makeFixedLayout(); // Default is fixed. However, this is how to change the layout manager
//panel.padding = 20;



// Creating three different containers that will be children of panel
// x and y properties are relative to the parent object
// With a fixed layout, elements are placed at the top left of the parent object
// Without setting x and y, all 3 containers would appear on top of one another
const container = new SKContainer( {width: 50, height: 50} );
container.fill = "red";
container.x = 55; // x coordinate for container
container.y = 65; // y coordinate for container

const container2 = new SKContainer( {width: 50, height: 50} );
container2.fill = "green";
container2.x = 265; // x coordinate for container2
container2.y = 120; // y coordinate for container2

const container3 = new SKContainer( {width: 50, height: 50} );
container3.fill = "blue";



// Add panel as a child of root
root.addChild(panel);

// Add the containers as children of panel
panel.addChild(container);
panel.addChild(container2);
panel.addChild(container3);

// Set the root and start SimpleKit
setSKRoot(root);
startSimpleKit();