# Customer Reward Program

## 📌 Project Description

A retailer offers a **rewards program** to its customers, awarding points based on each recorded purchase.
Customers earn points as follows:

* **2 points** for every dollar spent **over \$100** in a transaction.
* **1 point** for every dollar spent **between \$50 and \$100**.
* Example: a **\$120 purchase** = `2×20 + 1×50 = 90 points`.

This application calculates reward points **per transaction, per month, and total per customer** for a three-month period.

---

## 🚀 Features

* **Vanilla JavaScript** (no frameworks).
* **Local JSON mock file** simulating API calls.
* **Async API handling** with loading & error states.
* **Dynamic UI**:

  * Customer list with pagination / dropdown / table.
  * Reward points per month.
  * Total reward points per customer.
  * Transaction details per selected month.
* **Month & Year filter** (2021–2025).
* **No transactions** message for empty results.
* **Unit Testing (Jest)**:

  * 3 positive & 3 negative test cases.
  * Includes whole & fractional value tests.
* **Logging with Pino**.
* **Clean UI with CSS**.

---

## 📂 Project Structure

```
customer-reward-program/
├── public/
│   └── data/
│       └── transactions.json        # Mock transaction data
├── src/
│   ├── constants.js                 # Reusable constants
│   ├── logger.js                    # Pino logging setup
│   ├── api.js                       # Simulated API calls
│   ├── rewardsCalculator.js         # Reward calculation logic
│   ├── ui.js                        # DOM rendering & updates
│   ├── index.js                     # Main entry script
│   └── css/
│       └── styles.css               # Styling
├── tests/
│   └── rewardsCalculator.test.js    # Jest unit tests
├── index.html                        # Main app page
├── package.json                      # Dependencies
└── README.md                         # Documentation

```

---

## 📝 JSON Data (`transactions.json`)

```json
[
  {
    "customerId": "C001",
    "transactionId": "T1001",
    "amount": 120,
    "date": "2025-01-15"
  },
  {
    "customerId": "C001",
    "transactionId": "T1002",
    "amount": 75,
    "date": "2025-02-10"
  },
  {
    "customerId": "C002",
    "transactionId": "T2001",
    "amount": 200,
    "date": "2025-03-05"
  }
]
```

---

## ⚙️ Setup & Run

### 1. Install Required Tools
- Download & install Node.js → [https://nodejs.org](https://nodejs.org)  
- Download & install Visual Studio Code (VS Code) → [https://code.visualstudio.com](https://code.visualstudio.com)  

### 2. Get the Project Code
- Open VS Code  
- Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac) to open the Command Palette  
- Type `Git: Clone` and select it  
- Paste this repository URL:  

  ```bash
  https://github.com/KondariNaveen783/customer-reward-program.git
````

* Choose a folder and open the project in VS Code

### 3. Install Project Dependencies

Open a terminal in VS Code (Top Menu → Terminal → New Terminal) and run:

```bash
npm install
```

### 4. Install Live Server Extension

* In VS Code, go to the Extensions panel (left sidebar → square icon).
* Search for **Live Server** (by Ritwick Dey).
* Click **Install**.

### 5. Open the Application

**Option A: Go Live Button**

* At the bottom-right corner of VS Code, click the **“Go Live”** button.
* Your browser will automatically open and show the application.

**Option B: Command Palette**

* Press `Ctrl + Shift + P` (Windows/Linux) or `Cmd + Shift + P` (Mac)
* Type `Live Server: Open with Live Server`
* Select the file `index.html`

**Option C: Manual Open (without Live Server)**

* Open the project folder
* Double-click `index.html` to open it in your browser
* (Refresh manually after changes)

```

4. Run tests:

   ```bash
   npm test
   ```

---

## 🧪 Unit Tests

* Positive test cases (e.g., \$120 = 90 points).
* Negative test cases (e.g., \$0 = 0 points).
* Handles fractional & whole numbers.

---

## 📸 Screenshots

## 📸 Screenshots

<img width="1868" height="929" alt="image" src="https://github.com/user-attachments/assets/b4406a0d-500e-4e13-b74b-403e36d97e80" />
<img width="1289" height="929" alt="image" src="https://github.com/user-attachments/assets/5b617e4d-71cb-407d-97f3-6697bc895865" />
<img width="1462" height="894" alt="image" src="https://github.com/user-attachments/assets/0726769a-728a-40ae-bb78-87e00fb78ee1" />
<img width="278" height="593" alt="image" src="https://github.com/user-attachments/assets/207926c8-f865-4dd3-b5e6-a3d69c7efe0a" />
<img width="860" height="591" alt="image" src="https://github.com/user-attachments/assets/e5ddd853-da40-4325-9144-31ebe5998ac5" />

---

## 🛠️ Logging

This project uses **Pino** for logging.

## Logger Screenshots

<img width="875" height="939" alt="image" src="https://github.com/user-attachments/assets/125ec115-ffde-41bd-b649-f169310344d4" />


Example usage:

```js
import logger from "./logger.js";

logger.info("Transaction processed.");
logger.error("API call failed.");
logger.warn("No transactions for selected filter.");
```

---

## 📅 Filters

* **Months:** January → December.
* **Years:** 2021 → 2025 (default = 2025).
* Default filter = last 3 months.
