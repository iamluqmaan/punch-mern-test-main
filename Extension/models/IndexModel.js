export class IndexModel {
    constructor() {
      this.data = {};
    }
  
    /**
     * Updates the model data.
     * @param {object} newData - The new data to be stored.
     */
    updateData(newData) {
      this.data = { ...this.data, ...newData };
    }
  }
  