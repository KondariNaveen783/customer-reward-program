import logger from "./logger.js";

export async function fetchTransactionData() {
  logger.info("Fetching transaction data...");
  try {
    const response = await fetch("public/data/transactions.json");
    if (!response.ok) throw new Error("Failed to load data");
    const data = await response.json();
    logger.info(`Fetched ${data.length} transactions`);
    return data;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}
