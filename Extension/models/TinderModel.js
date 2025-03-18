import { BaseModel } from "./BaseModel.js";

export class TinderModel extends BaseModel {
  constructor() {
    super();
    this.matches = [];
  }

  /**
   * Adds a new Tinder match.
   * @param {object} match - Match data.
   */
  addMatch(match) {
    this.matches.push(match);
  }
}
