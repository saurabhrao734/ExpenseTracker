# Expense Tracker Web Application

## Overview

The **Expense Tracker** is a simple web application designed to help users manage and track their personal expenses. The app allows users to:
- Add expenses with a category, amount, and date.
- View a list of all expenses.
- Delete expenses from the list.
- Sort expenses by category, amount, or date.
- Keep track of the total expenses and savings.

The app uses **local storage** to persist data across page reloads, ensuring that expenses are not lost even if the page is refreshed.

[Expense Tracker Live Demo](https://udit-kasana.github.io/Expense-Tracker/)

---

## Features

- **Add Expenses**: Allows users to add expenses with a category, amount, and date.
- **View Expenses**: Displays all the expenses in a table format with the option to see the category, amount, and date of each entry.
- **Sort Expenses**: Users can sort the expenses based on category, amount, or date.
- **Delete Expenses**: Users can remove an individual expense, which will update the total expenses and savings automatically.
- **Local Storage**: All expense data is saved in the browser’s local storage, ensuring persistence across sessions.

---

## Folder Structure
    ```bash
    /ExpenseTracker
        /index.html
        /styles.css
        /script.js
        /README.md

---

## File Descriptions

### 1. `index.html`

This file contains the structure and layout of the app. It includes:
- A form to add new expenses (category, amount, date).
- A table to display all expenses.
- A button to sort expenses and a dropdown menu for selecting the sorting option.

### 2. `styles.css`

This file contains the styles for the app. It defines the look and feel of the app, including the layout, colors, typography, and form inputs. It also styles the dropdown menu and the table displaying expenses.

### 3. `script.js`

This JavaScript file contains all the functionality of the app. It includes:
- Event listeners to handle adding new expenses, sorting, and deleting.
- Functions to handle form validation and data saving to local storage.
- Functions to render the expenses dynamically on the page.
- A sorting function to arrange the expenses based on category, amount, or date.

---

## How to Run the Project

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/mukeshkumarsoni4/ExpenseTracker.git
2. Navigate to the project folder:

    ```bash
    cd ExpenseTracker

3. Open `index.html` in your browser to start using the app.
