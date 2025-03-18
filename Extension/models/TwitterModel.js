import { IndexModel } from "./IndexModel.js";

export class TwitterModel extends IndexModel {
  constructor() {
    super();
    this.tweets = [];
  }

  /**
   * Adds a tweet.
   * @param {object} tweet - Tweet content.
   */
  addTweet(tweet) {
    this.tweets.push(tweet);
  }
}
