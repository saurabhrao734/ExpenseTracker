// displaying forms
const income = document.querySelector("#update-income");
const incomeForm = document.querySelector(".income-section");
const expnses = document.querySelector("#update-expenses");
const expnsesForm = document.querySelector(".expense-form");
const closeBtn = document.querySelectorAll(".close-button");

income.addEventListener("click", () => {
  incomeForm.classList.add("show");
});
expnses.addEventListener("click", () => {
  expnsesForm.classList.add("show");
});
closeBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    this.parentElement.classList.remove("show");
  });
});

// data
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalIncome = Number(localStorage.getItem("totalIncome")) || 0;
let totalExpenses = Number(localStorage.getItem("totalExpenses")) || 0;
let savings = totalIncome - totalExpenses;

// data collectors
const incomeValue = document.getElementById("incomeAmount");
const ExpenseValue = document.getElementById("ExpenseAmount");
const savingsValue = document.getElementById("savingsAmount");
const totalAmount = document.getElementById("totalAmount");
const expensesResult = document.getElementById("expensesResult");

// current status display
currentStatus();
function currentStatus() {
  incomeValue.innerText = `${totalIncome.toFixed(2)}`;
  ExpenseValue.innerText = `${totalExpenses.toFixed(2)}`;
  savingsValue.innerText = savings.toFixed(2);
}

if (expenses.length !== 0) {
  renderData(expenses);
}

// getting values from local storage to table and current ststus
function renderData(expenses) {
  expensesResult.innerHTML = "";
  totalAmount.innerText = `₹${totalExpenses.toFixed(2)}`;

  expenses.forEach((expense) => {
    const { id, category, expenseAmount, date } = expense;

    const tr = document.createElement("tr");
    tr.setAttribute("data-id", id); // Attach ID to row

    tr.innerHTML = `
      <td>${category}</td>
      <td>₹${expenseAmount}</td>
      <td>${date}</td>
      <td>
          <button class="delete-btn">
              <i class="fas fa-trash-alt"></i>
          </button>
      </td>
    `;

    tr.querySelector(".delete-btn").addEventListener("click", function () {
      const row = this.closest("tr");
      const idToDelete = row.getAttribute("data-id");

      const index = expenses.findIndex((item) => item.id == idToDelete);
      if (index !== -1) {
        totalExpenses -= parseFloat(expenses[index].expenseAmount);
        savings = totalIncome - totalExpenses;

        // Remove from array
        expenses.splice(index, 1);

        // Update local storage
        localStorage.setItem("expenses", JSON.stringify(expenses));
        localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));

        // Update UI
        totalAmount.innerText = `₹${totalExpenses.toFixed(2)}`;
        ExpenseValue.innerText = totalExpenses.toFixed(2);
        savingsValue.innerText = savings.toFixed(2);

        // Remove row from DOM
        row.remove();
      }
    });

    expensesResult.appendChild(tr);
  });
}

// update income

const incomeUpdateBtn = document.getElementById("newIncome");

incomeUpdateBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const incomeUpdatedValue = document
    .getElementById("income-amount")
    .value.trim();

  const amountError = document.getElementById("amount-error");
  amountError.innerText = "";

  let isValid = true;

  if (!incomeUpdatedValue) {
    amountError.innerText = "Amount is required.";
    isValid = false;
  } else if (isNaN(Number(incomeUpdatedValue))) {
    amountError.innerText = "Please enter a valid number.";
    isValid = false;
  }

  if (!isValid) return;

  totalIncome = Number(incomeUpdatedValue);
  savings = totalIncome - totalExpenses;
  currentStatus();
  localStorage.setItem("totalIncome", `${totalIncome}`);
  document.querySelector(".income-section").reset();
  this.parentElement.classList.remove("show");
});

// updating expenses
const expenseAddBtn = document.getElementById("newExpense");

expenseAddBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Get field values
  const category = document.getElementById("category").value.trim();
  const expenseAmountInput = document
    .getElementById("expense-amount")
    .value.trim();
  const date = document.getElementById("date").value.trim();

  // Get error spans
  const categoryError = document.getElementById("category-error");
  const amountError = document.getElementById("amount-error");
  const dateError = document.getElementById("date-error");

  // Reset error messages
  categoryError.innerText = "";
  amountError.innerText = "";
  dateError.innerText = "";

  let isValid = true;

  if (!category) {
    categoryError.innerText = "Category is required.";
    isValid = false;
  }

  if (!expenseAmountInput) {
    amountError.innerText = "Amount is required.";
    isValid = false;
  } else if (isNaN(Number(expenseAmountInput))) {
    amountError.innerText = "Please enter a valid number.";
    isValid = false;
  }

  if (!date) {
    dateError.innerText = "Date is required.";
    isValid = false;
  }

  if (!isValid) return;

  const rawAmount = Number(expenseAmountInput);
  const expenseAmount = rawAmount.toFixed(2);
  const totalAmount = document.getElementById("totalAmount");

  // Update totals
  totalExpenses += rawAmount;
  savings = (totalIncome - totalExpenses).toFixed(2);

  // Update UI
  ExpenseValue.innerText = totalExpenses.toFixed(2);
  savingsValue.innerText = savings;

  // Create new expense with a unique id
  const newExpense = {
    id: Date.now(), // unique ID
    category,
    expenseAmount,
    date,
  };

  expenses.push(newExpense);

  // Store in localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("totalExpenses", totalExpenses.toFixed(2));

  // Re-render table
  renderData(expenses);

  // Reset form
  document.querySelector(".expense-form").reset();
  expenseAddBtn.parentElement.classList.remove("show");
});

// sort Expenses
const sortButton = document.getElementById("sort-expenses");
const sortMenu = document.getElementById("sort-menu");

sortButton.addEventListener("click", function (e) {
  e.preventDefault();
  sortMenu.style.display =
    sortMenu.style.display === "block" ? "none" : "block";
});

sortMenu.querySelectorAll("a").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const sortBy = item.getAttribute("data-sort");

    // Call the sorting function based on the selected criteria
    const criteria = sortBy;
    switch (criteria) {
      case "category":
        expenses = expenses.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        break;
      case "amount":
        expenses = expenses.sort(
          (a, b) => parseFloat(a.expenseAmount) - parseFloat(b.expenseAmount)
        );
        break;
      case "amount-desc":
        expenses = expenses.sort(
          (a, b) => parseFloat(b.expenseAmount) - parseFloat(a.expenseAmount)
        );
        break;
      case "date":
        expenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
    }
    sortMenu.style.display = "none";

    expensesResult.innerHTML = "";

    renderData(expenses);
  });
});
