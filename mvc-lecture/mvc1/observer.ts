export interface Observer {
  update(): void;
}

export class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
    // update the observer right away
    observer.update();
  }

  removeObserver(observer: Observer) {
    const i = this.observers.indexOf(observer);
    if (i === -1) return;
    this.observers.splice(i, 1);
  }
  protected notifyObservers() {
    for (const o of this.observers) {
      o.update();
    }
  }
}
