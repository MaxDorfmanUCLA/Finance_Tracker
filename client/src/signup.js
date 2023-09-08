import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Router, Route, Link, RouteHandler} from 'react-router';

import ExpenseTracker from './expenseTracker';
// import FinanceForm from './financeForm';
import Dashboard from './dashboard';
import Login from './login';


function Signup() {
  const navigate = useNavigate();
  // State to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
      e.preventDefault();
    await axios.post('http://localhost:3001/sign/up', {'email': email, 'password': password })

      .then(async (response) => {
        console.log("JSON.stringify(response): " + JSON.stringify(response));
        console.log("response.data.authenticated: " + response.data.authenticated);
        console.log("take user to financeform");
        
        if (response.data.authenticated === true) {
          // query  to get financial data for user
          await axios.get('http://localhost:3001/finances')

          .then((FinanceData) => {
            console.log("JSON.stringify(FinanceData): " + JSON.stringify(FinanceData));
            if (FinanceData.data.uid !== undefined) {
              // if user has financial data send them to the page where they can view it (/expenseTracker)
              navigate('/expenseTracker', { replace: true });

            } else {
              // if user has no financial data send them to the page where they can enter it (/financeForm)
              navigate('/financeForm', { replace: true });
            }
          })
          .catch(error => {
            console.log("error: " + error);
          });

        } else {
          navigate('/signup', { replace: true });
        }
      })
      .catch(error => {
        console.log("error: " + error);
      });
  };

  return (
    <div>
      <h1>Welcome to FinTrack</h1>
      <h3>No user profile matches the credentials you entered.</h3>
      <h3>Signup to Create Your Account!</h3>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
            <button class="button1" type="submit">Signup</button>
          
      </form>
    </div>
  );
}

export default Signup;
