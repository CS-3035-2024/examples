// local imports
import { Model } from "./model";

export class LeftController {
  constructor(private model: Model) {}

  handleButtonPress() {
    this.model.increment();
  }
}
