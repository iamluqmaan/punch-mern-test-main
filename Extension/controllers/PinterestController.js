import { BaseController } from "./IndexController.js";
import { PinterestModel } from "../models/PinterestModel.js";

/**
 * @class PinterestController
 * @extends BaseController
 * @classdesc Handles Pinterest-related communication.
 */
export class PinterestController extends BaseController {
  /**
   * @param {string} portName - The port to connect to.
   */
  constructor(portName) {
    super(portName, new PinterestModel());
  }

  /**
   * Handles messages received from the background script.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("PinterestController received message:", message);

    if (!message?.Tag) return;

    switch (message.Tag) {
      case "NewPin":
        this.handleNewPin(message.data);
        break;
      case "BoardUpdate":
        this.model.setBoardData(message.data);
        break;
      case "ProfileUpdate":
        this.model.setProfileData(message.data);
        break;
      case "Error":
        console.error("PinterestController Error:", message.error);
        break;
      default:
        console.warn("Unknown message tag:", message.Tag);
    }
  }

  /**
   * Handles new Pinterest pin data.
   * @param {object} pinData - The pin information.
   */
  handleNewPin(pinData) {
    if (!pinData) return;
    console.log("New Pinterest pin received:", pinData);

    this.model.setPinData(pinData);
  }

  /**
   * Posts a new pin to a board.
   * @param {string} boardId - The board ID.
   * @param {string} imageUrl - The image URL of the pin.
   * @param {string} description - The pin description.
   */
  postPin(boardId, imageUrl, description) {
    if (!boardId || !imageUrl.trim() || !description.trim()) {
      console.warn("Invalid pin details.");
      return;
    }

    this.sendMessage("PinterestAction", "postPin", {
      boardId,
      imageUrl,
      description,
    });
  }

  /**
   * Fetches the latest pins.
   */
  fetchLatestPins() {
    this.sendMessage("FetchPinterestPins", "request", "latest");
  }

  /**
   * Fetches the user's boards.
   */
  fetchBoards() {
    this.sendMessage("FetchPinterestBoards", "request", "all");
  }
}
