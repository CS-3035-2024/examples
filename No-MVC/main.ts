import {
    startSimpleKit,
    setSKRoot,
    SKButton,
    SKContainer,
    SKLabel,
    Layout,
} from "../simplekit/src/imperative-mode";


// Declare sizes for the main panel
const panelWidth:number = 350;
const panelHeight:number = 500;


// Create the root element
const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = Layout.makeCentredLayout();


// Create the panel
const panel = new SKContainer({height:panelHeight, width:panelWidth})
panel.fill = "white";
panel.border = "black";
panel.layoutMethod = Layout.makeWrapRowLayout();


// Create a top and bottom panel. Top panel contains random squares
// Bottom contains the randomize button
const topPanel = new SKContainer({height: panelHeight/1.25, width:panelWidth})
topPanel.layoutMethod = Layout.makeWrapRowLayout();
const bottomPanel = new SKContainer({height: panelHeight/5, width:panelWidth})
bottomPanel.layoutMethod = Layout.makeCentredLayout();
bottomPanel.fill = "lightblue";


// Create the button
const randomButton = new SKButton({text:"0"});


// Add the event listner
// Creates a random number of square containers
// Adds them as children of topPanel
// Updates the label of the button to be the random number
randomButton.addEventListener("action", () => {
    topPanel.clearChildren();
    let randomNumber = Math.floor(Math.random()*16) + 1
    for (let i = 0; i < randomNumber; i++){
        const button = new SKLabel({width:panelWidth/4, height: panelWidth/4, text: (i+1).toString()});
        button.fill = `hsl(${Math.random() * 360} 100% 50%)`;
        topPanel.addChild(button);
    }
    randomButton.text = randomNumber.toString();
});


root.addChild(panel);
panel.addChild(topPanel);
panel.addChild(bottomPanel);
bottomPanel.addChild(randomButton);

setSKRoot(root);
startSimpleKit();