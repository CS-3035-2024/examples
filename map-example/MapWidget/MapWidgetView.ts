import { MapWidget, MapWidgetModel } from ".";

export class MapWidgetView {
  private _map: MapWidget;
  private _model: MapWidgetModel;

  constructor(
    map: MapWidget,
    model: MapWidgetModel
  ) {
    this._model = model;
    this._map = map;
  }
  // a list of functions that will be called to draw different map features (e.g., a river or roads)
  public drawMapFeatureFunctions: Array<
    (
      gc: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number | undefined,
      height: number | undefined    
    ) => void
  > = [];

  // Function to draw a red circle at a given latitude and longitude
  // todo: provide properties for drawing of markers to allow styling
  public drawMarker(gc: CanvasRenderingContext2D, lat: number, lon: number, displayData: string, data:{}) {
    const { x, y } = this._model.latLonToCanvas(
      lat,
      lon,
      this._map.width,
      this._map.height
    );
    gc.save();
    gc.translate(this._map.x, this._map.y);
    // console.log(lat, lon, this._width, this._height);
    gc.beginPath();
    gc.arc(x, y, 5, 0, 2 * Math.PI);
    gc.fillStyle = "red";
    gc.fill();
    gc.closePath();
    gc.fillStyle = "black";

    gc.fillText(displayData, x-10, y-10);

    gc.restore();
  }

  //draw the widget
  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    if (this._map.fill!) {
      gc.fillStyle = this._map.fill;
      gc.fillRect(this._map.x!, this._map.y!, this._map.width!, this._map.height!);
    }

    //call any map drawing functions to display map features
    this.drawMapFeatureFunctions.forEach((func) => {
      func(gc, this._map.x, this._map.y, this._map.width, this._map.height);
    });

    // Draw each marker on the map

    this._model.points.forEach((property) => {
      const { latitude, longitude } = property;
      this.drawMarker(gc, latitude, longitude, property.dataDisplay, property.data);
    });

    //draw the border if there is one
    if (this._map.border) {
      gc.strokeStyle = this._map.border;
      gc.lineWidth = 1;
      gc.strokeRect(this._map.x, this._map.y, this._map.widthBasis, this._map.heightBasis);
    }
    gc.restore();
  }
}