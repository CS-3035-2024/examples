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
const panel = new SKContainer( {width: panelWidth, height: panelHeight} );
panel.fill = "white";
panel.border = "black";
panel.layoutMethod = Layout.makeCentredLayout(); // Setting the layout to centred



// Creating two different containers that will be children of panel. Due to the centred layout, elements appear on top of one another even with x and y set
const container = new SKContainer( {width: 50, height: 50} );
container.fill = "red";
container.x = 55; 
container.y = 65;

const container2 = new SKContainer( {width: 50, height: 50} );
container2.fill = "green";
container2.x = 265;
container2.y = 120;



// Add panel as a child of root
root.addChild(panel);

// Add the containers as children of panel
panel.addChild(container);
panel.addChild(container2);

// Set the root and start SimpleKit
setSKRoot(root);
startSimpleKit();