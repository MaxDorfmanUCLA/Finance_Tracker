import React, { useState } from 'react';
import axios from 'axios';
import './financeForm.css';
import { useNavigate } from "react-router-dom";
import {Router, Route, Link, RouteHandler} from 'react-router';

//import ExpenseTracker from './expenseTracker';
import Dashboard from './dashboard';
import Login from './login';
import Signup from './signup';


function FinanceForm() {
  const [income, setIncome] = useState('');
  const [expenseBudget, setExpenseBudget] = useState('');
  const [savings, setSavings] = useState('');
  const [investments, setInvestments] = useState('');

  // Function to handle finance form submission
  const addFinanceData = async(e) => {
    e.preventDefault();
   
    await axios.post('http://localhost:3001/fincances/new', { 
      'income': income,
      'expenseBudget': expenseBudget,
      'savings': savings,
      'investments': investments
    })

      .then((response) => {
        console.log("JSON.stringify(response): " + JSON.stringify(response));
        console.log("JSON.stringify(response.data): " + JSON.stringify(response.data));
      })

      .catch(error => {
        console.log("error: " + error);
      });
  };

  const getFinanceData = async(e) => {
    e.preventDefault();
   
    await axios.get('http://localhost:3001/fincances/new')

      .then((response) => {
        console.log("JSON.stringify(response): " + JSON.stringify(response));
        console.log("JSON.stringify(response.data): " + JSON.stringify(response.data));
      })

      .catch(error => {
        console.log("error: " + error);
      });
  };

  return (
    <div className="finance-form">
      <h1>FinTrack</h1>
      <h3>Enter your monthly expenses here.</h3>
      <form onSubmit={getFinanceData}>
        <div className="form-group">
          <label htmlFor="income">Income:</label>
          <input
            type="text"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expenseBudget">Expense Budget:</label>
          <input
            type="text"
            id="expenseBudget"
            value={expenseBudget}
            onChange={(e) => setExpenseBudget(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="savings">Savings:</label>
          <input
            type="text"
            id="savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="investments">Investments:</label>
          <input
            type="text"
            id="investments"
            value={investments}
            onChange={(e) => setInvestments(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FinanceForm;
