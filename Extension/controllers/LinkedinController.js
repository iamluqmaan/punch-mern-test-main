import { BaseController } from "./IndexController.js";
import { LinkedInModel } from "../models/LinkedinModel.js";

/**
 * @class LinkedInController
 * @extends BaseController
 * @classdesc Handles LinkedIn-related communication.
 */
export class LinkedInController extends BaseController {
  /**
   * @param {string} portName - The port to connect to.
   */
  constructor(portName) {
    super(portName, new LinkedInModel());
  }

  /**
   * Handles messages received from the background script.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("LinkedInController received message:", message);

    if (!message?.Tag) return;

    switch (message.Tag) {
      case "PostReceived":
        this.handleNewPost(message.data);
        break;
      case "ProfileUpdate":
        this.model.setProfileData(message.data);
        break;
      case "Error":
        console.error("LinkedInController Error:", message.error);
        break;
      default:
        console.warn("Unknown message tag:", message.Tag);
    }
  }

  /**
   * Handles incoming LinkedIn post data.
   * @param {object} postData - The LinkedIn post data.
   */
  handleNewPost(postData) {
    if (!postData) return;
    console.log("New LinkedIn post received:", postData);

    this.model.setPostData(postData);
  }

  /**
   * Posts an update on LinkedIn.
   * @param {string} content - The content of the post.
   */
  postUpdate(content) {
    if (!content.trim()) {
      console.warn("Cannot post an empty update.");
      return;
    }

    this.sendMessage("LinkedInAction", "postContent", content);
  }

  /**
   * Fetches the latest LinkedIn posts.
   */
  fetchLatestPosts() {
    this.sendMessage("FetchLinkedInPosts", "request", "latest");
  }
}
