document.addEventListener('DOMContentLoaded', () => {
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const transactionName = document.getElementById('transactionName');
    const transactionAmount = document.getElementById('transactionAmount');
    const transactionCategory = document.getElementById('transactionCategory');
    const transactionList = document.getElementById('transactionList');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');
    const balanceEl = document.getElementById('balance');
  
    // Function to get transactions from local storage
    function getTransactions() {
      return JSON.parse(localStorage.getItem('transactions')) || [];
    }
  
    // Function to save transactions to local storage
    function saveTransactions(transactions) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  
    // Function to display transactions
    function displayTransactions() {
      const transactions = getTransactions();
      transactionList.innerHTML = '';
  
      transactions.forEach((transaction, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${transaction.name} - $${transaction.amount.toFixed(2)} (${transaction.category})
          <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
        `;
        li.style.backgroundColor = transaction.category === 'Income' ? 'green' : 'yellow';
        li.style.color = 'black';
        transactionList.appendChild(li);
      });
  
      updateTotals(transactions);
    }
  
    // Function to update totals
    function updateTotals(transactions) {
      const income = transactions
        .filter(transaction => transaction.category === 'Income')
        .reduce((total, transaction) => total + transaction.amount, 0);
  
      const expenses = transactions
        .filter(transaction => transaction.category === 'Expense')
        .reduce((total, transaction) => total + transaction.amount, 0);
  
      totalIncomeEl.textContent = income.toFixed(2);
      totalExpensesEl.textContent = expenses.toFixed(2);
      balanceEl.textContent = (income - expenses).toFixed(2);
    }
  
    // Function to add a new transaction
    function addTransaction() {
      const name = transactionName.value.trim();
      const amount = parseFloat(transactionAmount.value);
      const category = transactionCategory.value;
  
      if (!name || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid transaction name and amount.');
        return;
      }
  
      const transactions = getTransactions();
      transactions.push({ name, amount, category });
      saveTransactions(transactions);
      displayTransactions();
  
      // Clear input fields
      transactionName.value = '';
      transactionAmount.value = '';
    }
  
    // Function to delete a transaction
    window.deleteTransaction = function (index) {
      const transactions = getTransactions();
      transactions.splice(index, 1);
      saveTransactions(transactions);
      displayTransactions();
    };
  
    // Event listener for the add transaction button
    addTransactionBtn.addEventListener('click', addTransaction);
  
    // Initial call to display transactions on page load
    displayTransactions();
  });
  