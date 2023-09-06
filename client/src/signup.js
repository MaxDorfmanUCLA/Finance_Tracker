import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Router, Route, Link, RouteHandler} from 'react-router';
import Dashboard from './dashboard.js';


function Signup() {
  const navigate = useNavigate();
  // State to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/sign/up', {'email': email, 'password': password })

      .then((response) => {
        console.log("JSON.stringify(response): " + JSON.stringify(response));
        console.log("response.data.authenticated: " + response.data.authenticated);
        console.log("take user to dashboard");
        
        
        if (response.data.authenticated === true) {
          // localStorage.setItem("authenticated", true);
          // navigate user to ("/Dashboard");
          // <Link to="/dashboard">Dashboard</Link>
          navigate('/dashboard', { replace: true });
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
