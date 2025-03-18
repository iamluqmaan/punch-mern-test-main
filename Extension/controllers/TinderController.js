import { BaseController } from "./IndexController.js";
import { TinderModel } from "../models/TinderModel.js";

/**
 * @class TinderController
 * @extends BaseController
 * @classdesc Handles Tinder-related communication.
 */
export class TinderController extends BaseController {
  /**
   * @param {string} portName - The port to connect to.
   */
  constructor(portName) {
    super(portName, new TinderModel());
  }

  /**
   * Handles messages received from the background script.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("TinderController received message:", message);

    if (!message?.Tag) return;

    switch (message.Tag) {
      case "MatchReceived":
        this.handleNewMatch(message.data);
        break;
      case "MessageReceived":
        this.handleNewMessage(message.data);
        break;
      case "ProfileUpdate":
        this.model.setProfileData(message.data);
        break;
      case "Error":
        console.error("TinderController Error:", message.error);
        break;
      default:
        console.warn("Unknown message tag:", message.Tag);
    }
  }

  /**
   * Handles new Tinder match data.
   * @param {object} matchData - The match information.
   */
  handleNewMatch(matchData) {
    if (!matchData) return;
    console.log("New Tinder match received:", matchData);

    this.model.setMatchData(matchData);
  }

  /**
   * Handles new Tinder message data.
   * @param {object} messageData - The message information.
   */
  handleNewMessage(messageData) {
    if (!messageData) return;
    console.log("New Tinder message received:", messageData);

    this.model.setMessageData(messageData);
  }

  /**
   * Sends a message to a Tinder match.
   * @param {string} matchId - The match ID.
   * @param {string} message - The message content.
   */
  sendMessageToMatch(matchId, message) {
    if (!matchId || !message.trim()) {
      console.warn("Cannot send an empty message.");
      return;
    }

    this.sendMessage("TinderAction", "sendMessage", { matchId, message });
  }

  /**
   * Fetches the latest Tinder matches.
   */
  fetchLatestMatches() {
    this.sendMessage("FetchTinderMatches", "request", "latest");
  }

  /**
   * Fetches the latest messages from matches.
   */
  fetchLatestMessages() {
    this.sendMessage("FetchTinderMessages", "request", "latest");
  }
}
