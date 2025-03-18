export class IndexView {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
    }
  
    /**
     * Renders generic content.
     * @param {string} content - HTML content or text to display.
     */
    render(content) {
      if (!this.container) {
        console.error("Container element not found");
        return;
      }
      this.container.innerHTML = content;
    }
  
    /**
     * Clears the view.
     */
    clear() {
      if (this.container) {
        this.container.innerHTML = "";
      }
    }
  
    /**
     * Displays an error message.
     * @param {string} message - Error message to display.
     */
    showError(message) {
      this.render(`<div class="error">Error: ${message}</div>`);
    }
  
    /**
     * Displays a success message.
     * @param {string} message - Success message to display.
     */
    showSuccess(message) {
      this.render(`<div class="success">${message}</div>`);
    }
  }
  