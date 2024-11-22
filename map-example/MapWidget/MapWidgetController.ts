import { setSKEventListener, SKEvent } from "../../simplekit/src/imperative-mode";
import { MapWidget, MapWidgetModel } from ".";

export class MapWidgetController {
  private _map: MapWidget;
  private _model: MapWidgetModel;
  public eventHandlers: Array<
    (
      e: SKEvent,
      map: MapWidget,
      model: MapWidgetModel
    ) => void
  > = [];

  constructor(map: MapWidget, model: MapWidgetModel) {
    this._map = map;
    this._model = model;
  }

  public runHandlers(e:SKEvent) { 
    this.eventHandlers.forEach((func)=>{
        func(e, this._map, this._model);
    });
  }
}
