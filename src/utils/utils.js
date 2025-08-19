import { REWARDS_CONFIG } from "./constants.js";
import logger from "../components/logger.js";

export function calculateRewardPoints(amount) {
  if (typeof amount !== "number" || amount < 0) {
    logger.warn(`Invalid amount: ${amount}`);
    return 0;
  }

  let points = 0;
  if (amount > REWARDS_CONFIG.TIER2_THRESHOLD) {
    points += (amount - REWARDS_CONFIG.TIER2_THRESHOLD) * REWARDS_CONFIG.TIER2_MULTIPLIER;
    points += (REWARDS_CONFIG.TIER2_THRESHOLD - REWARDS_CONFIG.TIER1_THRESHOLD);
  } else if (amount > REWARDS_CONFIG.TIER1_THRESHOLD) {
    points += (amount - REWARDS_CONFIG.TIER1_THRESHOLD);
  }
  return Math.floor(points);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function processTransactionData(transactions, monthFilter, yearFilter) {
  logger.info(`Processing ${transactions.length} transactions with filters: month=${monthFilter}, year=${yearFilter}`);

  const customers = new Map();
  const now = new Date();


  const year = parseInt(yearFilter, 10);

  let filteredTransactions = transactions;

  if (monthFilter === "last3") {
    
    let endMonth;
    if (year === now.getFullYear()) {
      endMonth = now.getMonth(); 
    } else {
      endMonth = 11; 
    }
    const last3Months = [endMonth, endMonth - 1, endMonth - 2].map(m => (m + 12) % 12);

    filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return (
        txDate.getFullYear() === year &&
        last3Months.includes(txDate.getMonth())
      );
    });
  } else if (monthFilter !== "" && monthFilter !== undefined && monthFilter !== null) {
    // Filter by specific month and year
    filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return (
        txDate.getFullYear() === year &&
        txDate.getMonth() === parseInt(monthFilter, 10)
      );
    });
  } else if (yearFilter) {
    // Only filter by year
    filteredTransactions = transactions.filter(tx => {
      const txDate = new Date(tx.date);
      return txDate.getFullYear() === year;
    });
  }

  filteredTransactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth();
    const transactionYear = transactionDate.getFullYear();

    if (!customers.has(transaction.customerId)) {
      customers.set(transaction.customerId, {
        customerId: transaction.customerId,
        customerName: transaction.customerName,
        transactions: [],
        monthlyPoints: new Map(),
        totalPoints: 0
      });
    }

    const customer = customers.get(transaction.customerId);
    const points = calculateRewardPoints(transaction.amount);

    const transactionWithPoints = {
      ...transaction,
      points,
      month: transactionMonth,
      year: transactionYear
    };

    customer.transactions.push(transactionWithPoints);

    const monthKey = `${transactionYear}-${transactionMonth}`;
    const currentMonthPoints = customer.monthlyPoints.get(monthKey) || 0;
    customer.monthlyPoints.set(monthKey, currentMonthPoints + points);
    customer.totalPoints += points;
  });

  return Array.from(customers.values());
}
