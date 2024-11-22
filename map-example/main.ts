import { SKEvent, SKMouseEvent } from "../simplekit/src/imperative-mode";
import {
  startSimpleKit,
  SKContainer,
  Layout,
  setSKRoot, 
  SKButton,
  setSKEventListener
} from "../simplekit/src/imperative-mode";

import { 
    MapPoint,
    MapWidget,
    MapWidgetModel
 } from "./MapWidget";

//inteface for storing data on properties
interface Property extends MapPoint{
    data: {
        id: number;
        address: string;
        price: number;
        bedrooms: number;
        bathrooms: number;
        property_type: string;
        features: string[];
        description: string;
    }
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Function to draw a river path on the canvas with scaling based on canvas size
function drawStJohnRiver(
  gc: CanvasRenderingContext2D,
  x: number = 0,
  y: number = 0,
  width: number = 400,
  height: number = 400
) {

  gc.save();
  gc.translate(x, y);

  gc.beginPath();

  // Define points as percentages of the canvas dimensions for scalability
  const startX = 0.0 * width; // 50 of 800 width
  const startY = 0.417 * height; // 550 of 600 height

  gc.moveTo(startX, startY);

  // Define curves using proportions of the canvas size
  gc.bezierCurveTo(
    0.1 * width,
    0.4 * height, // 100, 500
    0.25 * width,
    0.75 * height, // 200, 450
    0.375 * width,
    0.7 * height // 300, 500
  );

  gc.bezierCurveTo(
    0.6 * width,
    0.8 * height, // 400, 550
    0.625 * width,
    height, // 500, 600
    0.75 * width,
    0.75 * height // 600, 450
  );

  gc.bezierCurveTo(
    0.875 * width,
    0.667 * height, // 700, 400
    0.9375 * width,
    0.583 * height, // 750, 350
    1 * width,
    0.6 * height // 750, 400
  );

  // Style the river
  gc.strokeStyle = "#4fc3f7"; // River color
  gc.lineWidth = 0.035 * width; // Scale the width of the river based on canvas width
  gc.globalAlpha = 0.8; // Slight transparency
 // gc.lineCap = "round"; // Rounded ends for a smoother look
  gc.stroke();
  gc.restore();
}

//create root container
let root = new SKContainer();
root.width = 800;
root.height = 600;
root.layoutMethod = Layout.makeCentredLayout();

setSKRoot(root);

//demonstrating a callback when interacting with feature on map
function dataDisplayCallBack(data)
{
    console.log(data);
}

//get JSON data for properties
let propertiesForSale: Property[] = [];
let jsonData:{}[] = [];

try {
    //load JSON Data
  const response = await fetch("fredericton_properties.json");
  jsonData = await response.json();

  //reformat json data
  jsonData.forEach((record)=>{
        let prop: Property = {
          latitude: 0,
          longitude: 0,
          dataDisplay: "",
          data: {
            id: -1,
            address: "",
            price: -1,
            bedrooms: -1,
            bathrooms: -1,
            property_type: "",
            features: [],
            description: "",
          }
        };
        
        prop.latitude = record['latitude'];
        prop.longitude = record['longitude'];
        prop.data.address = record['address'];
        prop.data.description = record["description"];
        prop.data.features = record["features"];
        prop.data.property_type = record["property_type"];
        prop.data.bathrooms = record["bathrooms"];
        prop.data.bedrooms = record["bedrooms"];
        prop.data.id = record["id"];
        prop.data.price = record["price"];

        prop.dataDisplay = "";

        propertiesForSale.push(prop);
  });
  
} catch (error) {
  console.error("Error loading properties:", error);
}

//create MapWidget
let map = new MapWidget(propertiesForSale, {width: 800, height: 400});
map.border = "black";
map.drawMapFeatureFunctions.push(drawStJohnRiver);

//adding a handler for the map
map.addMapEventHandler(
    function(e:SKEvent, map:MapWidget, model:MapWidgetModel)
    {
        if (e.type === "mousemove")
        {
            let mouseEvent = e as SKMouseEvent;
            
            model.points.forEach((p) => {
                    const { x, y } = model.latLonToCanvas(
                        p.latitude,
                        p.longitude,
                        map.width,
                        map.height
                    );
                    // considered a hit if less than 5 pixels away
                    if (
                      calculateDistance(
                        map.x + x,
                        map.y + y,
                        mouseEvent.x,
                        mouseEvent.y
                      ) <= 5
                    ) {
                      // Format the price above to USD using the locale, style, and currency.
                      let CADDollar = new Intl.NumberFormat("en-CA", {
                        style: "currency",
                        currency: "CAD",
                      });
                      //demonstrating displaying to the map
                      p.dataDisplay = `${CADDollar.format(p.data['price'])}`;
                    
                      //demonstrating call to any function
                      dataDisplayCallBack(p.data);
                    } else {
                      p.dataDisplay = "";
                    }
            });
        }
    }
);

root.addChild(map);
startSimpleKit();