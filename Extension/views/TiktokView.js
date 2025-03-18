import { IndexView } from "./IndexView.js";

export class TikTokView extends IndexView {
  constructor(containerId) {
    super(containerId);
  }

  /**
   * Renders the TikTok-specific UI.
   */
  renderTikTokUI() {
    const tiktokContent = `
      <h2>TikTok Dashboard</h2>
      <button id="fetchVideos">Fetch Videos</button>
      <div id="videosContainer"></div>
    `;
    this.render(tiktokContent);

    // Example: Adding event listeners
    document.getElementById("fetchVideos").addEventListener("click", () => {
      this.showSuccess("Fetching TikTok videos...");
    });
  }
}
