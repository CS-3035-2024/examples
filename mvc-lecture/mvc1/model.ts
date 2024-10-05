import { Subject } from "./observer";

export class Model extends Subject {
  // model data (i.e. model state)
  private _count = 0;
  get count() {
    return this._count;
  }

  // model "business logic"
  increment() {
    this._count++;
    // need to notify observers any time the model changes
    this.notifyObservers();
  }
}
