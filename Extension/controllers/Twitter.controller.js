import { BaseController } from "./IndexController.js";
import { TwitterModel } from "../models/TwitterModel.js";

/**
 * @class TwitterController
 * @extends BaseController
 * @classdesc Handles Twitter-related communication.
 */
export class TwitterController extends BaseController {
  /**
   * @param {string} portName - The port to connect to.
   */
  constructor(portName) {
    super(portName, new TwitterModel());
  }

  /**
   * Handles messages received from the background script.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("TwitterController received message:", message);

    if (!message?.Tag) return;

    switch (message.Tag) {
      case "TweetReceived":
        this.handleNewTweet(message.data);
        break;
      case "Error":
        console.error("TwitterController Error:", message.error);
        break;
      default:
        console.warn("Unknown message tag:", message.Tag);
    }
  }

  /**
   * Handles incoming tweet data.
   * @param {object} tweetData - The tweet information.
   */
  handleNewTweet(tweetData) {
    if (!tweetData) return;
    console.log("New tweet received:", tweetData);

    // Update the model with the latest tweet
    this.model.setTweetData(tweetData);
  }

  /**
   * Sends a tweet through the background script.
   * @param {string} content - The tweet content.
   */
  sendTweet(content) {
    if (!content.trim()) {
      console.warn("Cannot send an empty tweet.");
      return;
    }

    this.sendMessage("TweetAction", "content", content);
  }

  /**
   * Requests the latest tweets from the background script.
   */
  fetchLatestTweets() {
    this.sendMessage("FetchTweets", "request", "latest");
  }
}
