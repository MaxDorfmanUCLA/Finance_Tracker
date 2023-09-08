import './App.css';
import React from 'react';
import { Link, Route, Routes, Router, IndexRoute } from 'react-router';
// import Nav from 'Nav';
// import Nav from './nav';
import { useNavigate } from "react-router-dom";
// import Header from 'Header'

// COMPONENTS
import ExpenseTracker from './expenseTracker';
import FinanceForm from './financeForm';
import Dashboard from './dashboard';
import Login from './login';
import Signup from './signup';


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/financeform" element={<FinanceForm />} />
        <Route path="/expenseTracker" element={<ExpenseTracker />} />
        <Route path="/financeForm" element={<FinanceForm />} />
      </Routes>
    </div>
  );
}

