import { BaseModel } from "./BaseModel.js";

export class PinterestModel extends BaseModel {
  constructor() {
    super();
    this.pins = [];
  }

  /**
   * Adds a new pin.
   * @param {object} pin - Pin data.
   */
  addPin(pin) {
    this.pins.push(pin);
  }
}
