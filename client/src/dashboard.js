import React, { useState } from 'react';
import axios from 'axios';
// import './financeForm.css';
import { useNavigate } from "react-router-dom";
import {Router, Route, Link, RouteHandler} from 'react-router';

import ExpenseTracker from './expenseTracker';
// import FinanceForm from './financeForm';
import Login from './login';
import Signup from './signup';

function Dashboard(props) {
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

export default Dashboard;
