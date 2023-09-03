const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const { initializeApp } = require ("firebase/app");
//const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require ("firebase/auth");
// Creating our Google Firebase auth instance with our generated account key
const admin = require("firebase-admin");
const credentials = require("../serviceAccountKey.json")



const User = require('../models/users');
// If the user's uid is present in cookies, they alreay have an account, are signed in, and able to view the dashboard 
// Otherwise, have them create an account by taking them to the sign in page. 

router.post('/in', async (req, res) => {
  // Using the user's table which hold's unique emails to see if a user already has an account

  try{
    const usereData = await User.find(req.body.email);
    
    if (usereData.email === undefined) {
      res.send("Your email address is not in our system. You will now be redirected to the signup page")
      // redirect to the signup page
    } else {
      // redirect to the dashboard
    }
  } catch(err) {
    console.log("Error: " + err);
  }

});


router.post('/up', async (req, res) => {
  // implementing async await here because we are attempting to create a user in Firebase
  // and following code logic will be dependant on receieving a response
  try{
    const userResponse = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      disabled: false
    });

    res.setHeader('Set-Cookie', 'uid=' + userResponse.uid);
    res.status(200)
    .json({ message: "Signed up successfully 👌" });
    //.load dashboard page

  } catch(err) {
    console.log("error: " + err);
  }
});

router.get('/cookie', (req, res) => {
  let cookies = {};

  const cookiesArray = req.headers.cookie.split(';');

  cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=');
      cookies[key] = value;
  });

  res.json(cookies.uid); 
})


module.exports = router;