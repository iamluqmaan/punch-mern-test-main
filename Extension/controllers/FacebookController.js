import { FacebookModel } from "../models/FacebookModel";
import { FacebookView } from "../views/FAcebookView";
import { BaseController } from "./IndexController";

/**
 * @class FacebookController
 * @extends BaseController
 */
export class FacebookController extends BaseController {
  constructor() {
    super("facebook", new FacebookModel());
    this.view = new FacebookView();
    this.cachedButtons = [];
  }

  /**
   * Handles incoming messages.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("FacebookController received message:", message);
    this.model.lastMessage = message;

    const handlers = {
      Updatefacebook: () => (this.model.data = message.story),
      LikeFollow: () => this.handleLikeFollowMessage(message),
    };

    handlers[message.Tag]?.();
  }

  /**
   * Processes 'LikeFollow' messages.
   * @param {object} message - The received message.
   */
  handleLikeFollowMessage({ story }) {
    if (story?.StartfacebookFollow && story?.FollowedPoolfacebookSize < story?.MaxfacebookFollows) {
      this.handleFacebookLikeFollow(5);
    }
  }

  /**
   * Automates the follow process for Facebook.
   * @param {number} numScrolls - Number of scroll attempts.
   */
  async handleFacebookLikeFollow(numScrolls) {
    for (let i = 0; i < numScrolls; i++) {
      await this.view.scrollPageWithTimeout(1, 30000);
      
      this.view.setTimeout(() => {
        const addFriendButton = this.findRandomAddFriendButton();
        if (addFriendButton) {
          this.view.clickAddFriendButton(addFriendButton);
          this.sendFollowMessage(addFriendButton);
        }
      }, this.view.getRandomTimeout(30000));
    }
  }

  /**
   * Caches available 'Add Friend' buttons.
   */
  cacheFriendButtons() {
    this.cachedButtons = this.view
      .getElements("div")
      .filter(el => this.view.getElementAttribute(el, "aria-label")?.includes("Add Friend"));
  }

  /**
   * Finds a random 'Add Friend' button.
   * @returns {Element|null} A random button or null if none found.
   */
  findRandomAddFriendButton() {
    if (!this.cachedButtons.length) this.cacheFriendButtons();
    return this.cachedButtons.length ? this.cachedButtons.splice(Math.floor(Math.random() * this.cachedButtons.length), 1)[0] : null;
  }

  /**
   * Sends a follow confirmation message.
   * @param {Element} buttonElement - The 'Add Friend' button element.
   */
  sendFollowMessage(buttonElement) {
    const msgData = {
      url: this.extractElementData(buttonElement, this.view.getProfileLinkElement, "href", "unknown_profile_url"),
      username: this.extractElementData(buttonElement, this.view.getUsernameElement, "innerText", "unknown_username"),
      img: this.extractElementData(buttonElement, this.view.getImgSrcElement, "xlink:href", "default_img_src"),
    };
    this.sendMessage("DonefacebookFollow", "User", msgData);
  }

  /**
   * Extracts an attribute or text from an element.
   * @param {Element} buttonElement - The button containing target element.
   * @param {Function} getElementFn - Function to get the target element.
   * @param {string} attribute - The attribute or property to extract.
   * @param {string} defaultValue - Default value if not found.
   * @returns {string} Extracted value or default.
   */
  extractElementData(buttonElement, getElementFn, attribute, defaultValue) {
    const element = getElementFn.call(this.view, buttonElement);
    return element?.[attribute] ?? this.view.getElementAttribute(element, attribute) ?? defaultValue;
  }
}
