import { IndexModel } from "./IndexModel.js";

export class LinkedInModel extends IndexModel {
  constructor() {
    super();
    this.connections = [];
  }

  /**
   * Adds a LinkedIn connection.
   * @param {object} profile - Profile data.
   */
  addConnection(profile) {
    this.connections.push(profile);
  }
}
