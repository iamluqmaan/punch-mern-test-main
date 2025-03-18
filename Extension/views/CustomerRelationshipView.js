import { IndexView } from "./IndexView.js";

export class CRMView extends IndexView {
  constructor(containerId) {
    super(containerId);
  }

  /**
   * Renders the CRM dashboard.
   */
  renderCRMDashboard() {
    const crmContent = `
      <h2>CRM Dashboard</h2>
      <button id="loadCustomers">Load Customers</button>
      <div id="customerList"></div>
    `;
    this.render(crmContent);

    // Example: Event listener for loading customers
    document.getElementById("loadCustomers").addEventListener("click", () => {
      this.showSuccess("Loading customer data...");
    });
  }
}
