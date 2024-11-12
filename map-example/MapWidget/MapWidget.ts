import { SKElement } from "../../simplekit/src/widget/";
import { SKEvent, SKMouseEvent } from "../../simplekit/src/events";
import { MapWidgetController } from "./MapWidgetController";
import { MapWidgetModel, MapPoint } from "./MapWidgetModel";
import { MapWidgetView } from "./MapWidgetView";

// A Map Widget for SimpleKit that displays
export class MapWidget extends SKElement {
  private _model: MapWidgetModel;
  private _view: MapWidgetView;
  private _controller: MapWidgetController;

  constructor(
    points: MapPoint[],
    {
      x = 0,
      y = 0,
      width = 400,
      height = 400,
      fill = "lightgreen",
      border = "black",
    } = {}
  ) {
    super({
      x: x,
      y: y,
      width: width,
      height: height,
      fill: fill,
      border: border,
    });
    this._model = new MapWidgetModel(points);
    this._view = new MapWidgetView(this, this._model);
    this._controller = new MapWidgetController(this, this._model);
  }

  draw(gc: CanvasRenderingContext2D) {
    super.draw(gc);
    this._view.draw(gc);
  }

    handleMouseEvent(me: SKMouseEvent):boolean {
        this._controller.runHandlers(me);
        return true;
    }
  public get drawMapFeatureFunctions(): Array<
    (
      gc: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number | undefined,
      height: number | undefined,
      data: {} | undefined
    ) => void
  > {
    return this._view.drawMapFeatureFunctions;
  }

  public addMapEventHandler(func: (SKEvent, MapWidget, MapWidgetModel) => void) {
        this._controller.eventHandlers.push(func);
  }
}
