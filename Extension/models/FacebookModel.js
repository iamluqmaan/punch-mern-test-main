import { BaseModel } from "./IndexModel.js";

export class FacebookModel extends BaseModel {
  constructor() {
    super();
    this.posts = [];
    this.friends = [];
  }

  /**
   * Adds a new post.
   * @param {object} post - Post data.
   */
  addPost(post) {
    this.posts.push(post);
  }

  /**
   * Adds a new friend.
   * @param {object} friend - Friend data.
   */
  addFriend(friend) {
    this.friends.push(friend);
  }
}
