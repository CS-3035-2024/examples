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
panel.layoutMethod = Layout.makeWrapRowLayout( {gap: 20} ); // Setting the layout to wrap row. Gap property creates gaps between other elements



// Creating four different containers that will be children of panel
const container = new SKContainer( {width: 250, height: 70} );
container.fill = "red";

const container2 = new SKContainer( {width: 100, height: 50} );
container2.fill = "green";

const container3 = new SKContainer( {width: 65, height: 85} );
container3.fill = "blue";

const container4 = new SKContainer( {width: 300, height: 90} );
container4.fill = "purple";



// Add panel as a child of root
root.addChild(panel);

// Add the containers as children of panel
panel.addChild(container);
panel.addChild(container2);
panel.addChild(container3);
panel.addChild(container4);

// Set the root and start SimpleKit
setSKRoot(root);
startSimpleKit();