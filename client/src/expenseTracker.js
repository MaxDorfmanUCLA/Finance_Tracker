import React from 'react';
import './expenseTracker.css';

//import FinanceForm from './financeForm';
import Dashboard from './dashboard';
import Login from './login';
import Signup from './signup';

function ExpenseTracker(props) {
  const { income, expenseBudget, savings, investments, timestamp } = props;

  return (
    <div className="expense-tracker-data">
      <h2>Expense Tracker Data</h2>
      <div className="data-item">
        <strong>Income:</strong> {income}
      </div>
      <div className="data-item">
        <strong>Expense Budget:</strong> {expenseBudget}
      </div>
      <div className="data-item">
        <strong>Savings:</strong> {savings}
      </div>
      <div className="data-item">
        <strong>Investments:</strong> {investments}
      </div>
      <div className="data-item">
        <strong>Timestamp:</strong> {timestamp}
      </div>
    </div>
  );
}

export default ExpenseTracker;
