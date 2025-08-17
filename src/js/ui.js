import { MONTHS, REWARDS_CONFIG } from "./constants.js";
import { formatCurrency, formatDate } from "./utils.js";
import logger from "./logger.js";

export function showLoading(elements) {
  elements.loading.style.display = "block";
  elements.error.style.display = "none";
  elements.dashboard.style.display = "none";
}

export function showError(elements, message) {
  elements.loading.style.display = "none";
  elements.error.style.display = "block";
  elements.error.textContent = message;
  elements.dashboard.style.display = "none";
}

export function showDashboard(elements) {
  elements.loading.style.display = "none";
  elements.error.style.display = "none";
  elements.dashboard.style.display = "grid";
}

export function renderCustomerList(elements, customers, currentPage, selectedCustomer) {
  const startIndex = (currentPage - 1) * REWARDS_CONFIG.PAGINATION_SIZE;
  const endIndex = startIndex + REWARDS_CONFIG.PAGINATION_SIZE;
  const paginatedCustomers = customers.slice(startIndex, endIndex);

  elements.customerList.innerHTML = paginatedCustomers.map(customer => `
    <div class="customer-item ${selectedCustomer?.customerId === customer.customerId ? 'active' : ''}" 
         data-customer-id="${customer.customerId}">
      <h4>${customer.customerName}</h4>
      <p>ID: ${customer.customerId}</p>
      <p>Total Points: ${customer.totalPoints}</p>
    </div>
  `).join("");

  renderCustomerPagination(elements, customers, currentPage);
}

function renderCustomerPagination(elements, customers, currentPage) {
  const totalPages = Math.ceil(customers.length / REWARDS_CONFIG.PAGINATION_SIZE);

  if (totalPages <= 1) {
    elements.customerPagination.innerHTML = "";
    return;
  }

  let paginationHTML = `
    <button ${currentPage === 1 ? "disabled" : ""} data-page="${currentPage - 1}">Previous</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
      <button class="${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>
    `;
  }

  paginationHTML += `
    <button ${currentPage === totalPages ? "disabled" : ""} data-page="${currentPage + 1}">Next</button>
  `;

  elements.customerPagination.innerHTML = paginationHTML;
}

export function renderCustomerDetails(elements, selectedCustomer, selectedMonth) {
  if (!selectedCustomer) {
    elements.customerHeader.innerHTML = '<p class="no-data">Please select a customer</p>';
    elements.totalPoints.innerHTML = "";
    elements.monthlySummary.innerHTML = "";
    elements.transactions.innerHTML = "";
    return;
  }

  elements.customerHeader.innerHTML = `
    <h2>${selectedCustomer.customerName}</h2>
    <p>Customer ID: ${selectedCustomer.customerId}</p>
  `;

  elements.totalPoints.innerHTML = `
    <h3>${selectedCustomer.totalPoints}</h3>
    <p>Total Reward Points</p>
  `;

  renderMonthlySummary(elements, selectedCustomer, selectedMonth);
  renderTransactions(elements, selectedCustomer, selectedMonth);
}

export function renderMonthlySummary(elements, selectedCustomer, selectedMonth) {
  const monthlyData = Array.from(selectedCustomer.monthlyPoints.entries())
    .map(([monthKey, points]) => {
      const [year, month] = monthKey.split("-").map(Number);
      return { monthKey, month, year, points };
    })
    .sort((a, b) => a.year - b.year || a.month - b.month);

  if (monthlyData.length === 0) {
    elements.monthlySummary.innerHTML = "<p class='no-data'>No monthly data</p>";
    return;
  }

  elements.monthlySummary.innerHTML = monthlyData.map(data => `
    <div class="month-card ${selectedMonth === data.monthKey ? "selected" : ""}" 
         data-month-key="${data.monthKey}">
      <h4>${MONTHS[data.month]} ${data.year}</h4>
      <div class="points">${data.points}</div>
      <p>points</p>
    </div>
  `).join("");
}

export function renderTransactions(elements, selectedCustomer, selectedMonth) {
  if (!selectedCustomer || selectedCustomer.transactions.length === 0) {
    elements.transactions.innerHTML = "<p class='no-data'>No transactions found</p>";
    return;
  }

  let transactionsToShow = selectedCustomer.transactions;

  if (selectedMonth) {
    const [year, month] = selectedMonth.split("-").map(Number);
    transactionsToShow = selectedCustomer.transactions.filter(
      t => t.year === year && t.month === month
    );
  }

  if (transactionsToShow.length === 0) {
    elements.transactions.innerHTML = `<p class="no-data">No transactions for selected month</p>`;
    return;
  }

  elements.transactions.innerHTML = `
    <h4>Transactions</h4>
    <table class="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        ${transactionsToShow.map(t => `
          <tr>
            <td>${formatDate(t.date)}</td>
            <td>${t.transactionId}</td>
            <td>${formatCurrency(t.amount)}</td>
            <td>${t.points}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}
