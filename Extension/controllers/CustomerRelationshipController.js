import { BaseController } from "./IndexController.js";
import { CRMModel } from "../models/CRMModel.js";

/**
 * @class CRMController
 * @extends BaseController
 * @classdesc Handles CRM-related communication and actions.
 */
export class CRMController extends BaseController {
  /**
   * @param {string} portName - The port to connect to.
   */
  constructor(portName) {
    super(portName, new CRMModel());
  }

  /**
   * Handles messages received from the background script.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("CRMController received message:", message);

    if (!message?.Tag) return;

    switch (message.Tag) {
      case "NewLead":
        this.handleNewLead(message.data);
        break;
      case "UpdateContact":
        this.model.updateContact(message.data);
        break;
      case "SyncCRMData":
        this.model.syncCRMData(message.data);
        break;
      case "Error":
        console.error("CRMController Error:", message.error);
        break;
      default:
        console.warn("Unknown message tag:", message.Tag);
    }
  }

  /**
   * Handles new lead data.
   * @param {object} leadData - The lead information.
   */
  handleNewLead(leadData) {
    if (!leadData) return;
    console.log("New CRM lead received:", leadData);

    this.model.setLeadData(leadData);
  }

  /**
   * Adds a new lead to the CRM.
   * @param {string} name - Lead's name.
   * @param {string} email - Lead's email.
   * @param {string} company - Lead's company.
   */
  addLead(name, email, company) {
    if (!name.trim() || !email.trim() || !company.trim()) {
      console.warn("Invalid lead details.");
      return;
    }

    this.sendMessage("CRMAction", "addLead", {
      name,
      email,
      company,
    });
  }

  /**
   * Fetches all CRM contacts.
   */
  fetchContacts() {
    this.sendMessage("FetchCRMContacts", "request", "all");
  }

  /**
   * Syncs CRM data.
   */
  syncData() {
    this.sendMessage("SyncCRMData", "request", "start");
  }
}
