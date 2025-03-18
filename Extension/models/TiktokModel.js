import { IndexModel } from "./IndexModel.js";

export class TikTokModel extends IndexModel {
  constructor() {
    super();
    this.videos = [];
  }

  /**
   * Adds a TikTok video.
   * @param {object} video - Video data.
   */
  addVideo(video) {
    this.videos.push(video);
  }
}
