import { fetchTransactionData } from "./api.js";
import { processTransactionData } from "./utils.js";
import { showLoading, showError, showDashboard, renderCustomerList, renderCustomerDetails } from "./ui.js";
import logger from "./logger.js";
import { MONTHS } from "./constants.js";

// UI state
let currentCustomers = [];
let selectedCustomer = null;
let selectedMonth = null;
let currentPage = 1;

// DOM elements
const elements = {
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  dashboard: document.getElementById("dashboard"),
  monthFilter: document.getElementById("monthFilter"),
  yearFilter: document.getElementById("yearFilter"),
  applyFilters: document.getElementById("applyFilters"),
  customerList: document.getElementById("customerList"),
  customerPagination: document.getElementById("customerPagination"),
  customerHeader: document.getElementById("customerHeader"),
  totalPoints: document.getElementById("totalPoints"),
  monthlySummary: document.getElementById("monthlySummary"),
  transactions: document.getElementById("transactions")
};

async function loadData() {
  try {
    showLoading(elements);
    const transactions = await fetchTransactionData();
    const monthFilter = elements.monthFilter.value;
    const yearFilter = elements.yearFilter.value;

    currentCustomers = processTransactionData(transactions, monthFilter, yearFilter);

    if (currentCustomers.length === 0) {
      showError(elements, "No transactions found");
      return;
    }

    currentPage = 1;
    selectedCustomer = currentCustomers[0];
    selectedMonth = null;

    showDashboard(elements);
    renderCustomerList(elements, currentCustomers, currentPage, selectedCustomer);
    renderCustomerDetails(elements, selectedCustomer, selectedMonth);

    logger.info(`Dashboard loaded with ${currentCustomers.length} customers`);
  } catch (err) {
    logger.error(`Failed to load data: ${err.message}`);
    showError(elements, "Failed to load customer data");
  }
}

// Handlers
function handleCustomerSelection(customerId) {
  selectedCustomer = currentCustomers.find(c => c.customerId === customerId);
  selectedMonth = null;
  renderCustomerList(elements, currentCustomers, currentPage, selectedCustomer);
  renderCustomerDetails(elements, selectedCustomer, selectedMonth);
  logger.info(`Customer selected: ${selectedCustomer.customerName}`);
}

function handleMonthSelection(monthKey) {
  selectedMonth = selectedMonth === monthKey ? null : monthKey;
  renderCustomerDetails(elements, selectedCustomer, selectedMonth);
  logger.info(`Month selected: ${monthKey}`);
}

function handlePagination(page) {
  currentPage = parseInt(page);
  renderCustomerList(elements, currentCustomers, currentPage, selectedCustomer);
  logger.info(`Page changed to ${currentPage}`);
}

// Event Listeners
elements.applyFilters.addEventListener("click", loadData);
elements.customerList.addEventListener("click", e => {
  const customerItem = e.target.closest(".customer-item");
  if (customerItem) handleCustomerSelection(customerItem.dataset.customerId);
});
elements.customerPagination.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON" && !e.target.disabled) {
    handlePagination(e.target.dataset.page);
  }
});
elements.monthlySummary.addEventListener("click", e => {
  const monthCard = e.target.closest(".month-card");
  if (monthCard) handleMonthSelection(monthCard.dataset.monthKey);
});

function populateFilters(elements) {
  // Populate month filter
  elements.monthFilter.innerHTML = `<option value="">Last 3 Months</option>`;
  MONTHS.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    elements.monthFilter.appendChild(option);
  });

  // Populate year filter (default 2025 → 2021)
  const currentYear = new Date().getFullYear();
  elements.yearFilter.innerHTML = "";
  for (let y = currentYear; y >= currentYear - 4; y--) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    elements.yearFilter.appendChild(option);
  }
  elements.yearFilter.value = currentYear; // default select current year
}
// Init
populateFilters(elements);
loadData();
