import { IndexView } from "./IndexView.js";

export class TwitterView extends IndexView {
  constructor(containerId) {
    super(containerId);
  }

  /**
   * Renders the Twitter-specific UI.
   */
  renderTwitterUI() {
    const twitterContent = `
      <h2>Twitter Dashboard</h2>
      <button id="fetchTweets">Fetch Tweets</button>
      <div id="tweetsContainer"></div>
    `;
    this.render(twitterContent);

    // Example: Adding event listeners
    document.getElementById("fetchTweets").addEventListener("click", () => {
      this.showSuccess("Fetching Twitter tweets...");
    });
  }
}
