import { BaseModel } from "../models/IndexModel.js";

/**
 * @template {BaseModel} Model
 * @class BaseController
 * @classdesc Base class for all controllers.
 */
export class BaseController {
  /**
   * @param {string} portName - The port to connect to.
   * @param {Model} model - An instance of the model.
   */
  constructor(portName, model = new BaseModel()) {
    /** @type {chrome.runtime.Port|null} */
    this.comPort = null;
    
    /** @type {Model} */
    this.model = model;

    this.initializeComPort(portName);
  }

  /**
   * Initializes the communication port and sets up event listeners.
   * @param {string} portName - The port name.
   */
  initializeComPort(portName) {
    if (typeof chrome !== "undefined" && chrome.runtime?.connect) {
      try {
        this.comPort = chrome.runtime.connect({ name: portName });
        this.comPort.onMessage.addListener(this.onMessageReceive.bind(this));
        console.log(`Connected to Chrome port: ${portName}`);
      } catch (error) {
        console.error("Failed to connect to Chrome port:", error);
      }
    } else {
      console.warn("Chrome runtime is not available.");
    }

    window.addEventListener("message", this.onWindowMessage.bind(this), false);
  }

  /**
   * Handles incoming messages from the background script.
   * Should be overridden by subclasses to handle specific messages.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("BaseController received message:", message);
  }

  /**
   * Handles messages received from the window.
   * @param {MessageEvent} event - The message event.
   */
  onWindowMessage(event) {
    if (event.source !== window || !event.data?.Tag) return;
    if (event.data.Tag === "SharedData" && this.model) {
      this.model.data = event.data.SharedData;
    }
  }

  /**
   * Sends a message to the background script.
   * @param {string} tag - The message category.
   * @param {string} msgTag - The message key.
   * @param {any} msg - The message content.
   */
  sendMessage(tag, msgTag, msg) {
    if (!this.comPort) {
      console.error("ComPort is not initialized.");
      return;
    }
    const sendObj = { Tag: tag, [msgTag]: msg };
    console.log("Sending message:", sendObj);
    this.comPort.postMessage(sendObj);
  }
}
