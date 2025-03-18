import { BaseController } from "./IndexController.js";
import { TikTokModel } from "../models/TiktokModel.js";

/**
 * @class TikTokController
 * @extends BaseController
 * @classdesc Handles TikTok-related communication.
 */
export class TikTokController extends BaseController {
  /**
   * @param {string} portName - The port to connect to.
   */
  constructor(portName) {
    super(portName, new TikTokModel());
  }

  /**
   * Handles messages received from the background script.
   * @param {object} message - The received message.
   */
  onMessageReceive(message) {
    console.log("TikTokController received message:", message);

    if (!message?.Tag) return;

    switch (message.Tag) {
      case "VideoReceived":
        this.handleNewVideo(message.data);
        break;
      case "ProfileUpdate":
        this.model.setProfileData(message.data);
        break;
      case "Error":
        console.error("TikTokController Error:", message.error);
        break;
      default:
        console.warn("Unknown message tag:", message.Tag);
    }
  }

  /**
   * Handles incoming TikTok video data.
   * @param {object} videoData - The video information.
   */
  handleNewVideo(videoData) {
    if (!videoData) return;
    console.log("New TikTok video received:", videoData);

    this.model.setVideoData(videoData);
  }

  /**
   * Uploads a video to TikTok.
   * @param {object} videoFile - The video file to upload.
   */
  uploadVideo(videoFile) {
    if (!videoFile) {
      console.warn("Cannot upload an empty video.");
      return;
    }

    this.sendMessage("TikTokAction", "uploadVideo", videoFile);
  }

  /**
   * Fetches the latest TikTok videos.
   */
  fetchLatestVideos() {
    this.sendMessage("FetchTikTokVideos", "request", "latest");
  }
}
