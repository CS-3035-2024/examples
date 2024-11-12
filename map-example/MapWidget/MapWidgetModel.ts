// Define the property interface based on JSON structure
export interface MapPoint {
    latitude: number;
    longitude: number;
    data: {};
    dataDisplay: string;
}

export class MapWidgetModel {
  private _points: MapPoint[]; //points to be drawn on the map

  private _minLon: number;
  private _maxLon: number;
  private _minLat: number;
  private _maxLat: number;

  constructor(points: MapPoint[]) {
    this.points = points;
  }

  public get points(): MapPoint[] {
    return this._points;
  }

  public set points(points: MapPoint[]) {
    this._points = points;
    this._setMinMax();
  }

  private _setMinMax(): void {
    //determine the min and max values for scaling
    //the map while drawing, so that everything is visible
    this._minLon =
      this._points.reduce((prev, curr) =>
        prev.longitude < curr.longitude ? prev : curr
      ).longitude - 0.0015;
    this._minLat =
      this._points.reduce((prev, curr) =>
        prev.latitude < curr.latitude ? prev : curr
      ).latitude - 0.0015;
    this._maxLon =
      this._points.reduce((prev, curr) =>
        prev.longitude > curr.longitude ? prev : curr
      ).longitude + 0.0015;
    this._maxLat =
      this._points.reduce((prev, curr) =>
        prev.latitude > curr.latitude ? prev : curr
      ).latitude + 0.0015;
  }

  // Function to convert latitude and longitude to canvas coordinates
  public latLonToCanvas(
    lat: number,
    lon: number,
    canvasWidth: number = 400,
    canvasHeight: number = 400
  ) {
    const x =
      ((lon - this._minLon) / (this._maxLon - this._minLon)) * canvasWidth;
    const y =
      canvasHeight -
      ((lat - this._minLat) / (this._maxLat - this._minLat)) * canvasHeight;
    return { x,y };
  }
}