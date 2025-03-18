import { BaseModel } from "./IndexModel.js";

export class CRMModel extends BaseModel {
  constructor() {
    super();
    this.customers = [];
    this.leads = [];
  }

  /**
   * Adds a new customer.
   * @param {object} customer - Customer data.
   */
  addCustomer(customer) {
    this.customers.push(customer);
  }

  /**
   * Adds a new lead.
   * @param {object} lead - Lead data.
   */
  addLead(lead) {
    this.leads.push(lead);
  }
}
