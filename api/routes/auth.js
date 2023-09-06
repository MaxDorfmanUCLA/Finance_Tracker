const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const { initializeApp } = require ("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require ("firebase/auth");



// using firebase project config to initialize firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

router.post('/in', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  // implementing async await here because we are attempting to create a user in Firebase
  // and following code logic will be dependant on receieving a response
  try{
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then((userCredential) => {
      // User successfully signed in to the app 
      const user = userCredential.user;
     
      // Clear any existing cookies from the session before creating a new one with signed in user's ID
      res.clearCookie("uid");

      res.cookie('uid',user.uid, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, sameSite: "None" });
       //.load dashboard page
      res.status(200).json({ authenticated: true, message: "Signed in successfully 👌", uid: user.uid });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`error: ${errorMessage}, errorCode: ${errorCode}`);
      res.send(`error: ${errorMessage}, errorCode: ${errorCode}`);
    });
  } catch(err) {
    console.log(`error: ${err}`);
    res.send(`error: ${err}`)
  }

});


router.post('/up', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With", "content-type");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  // implementing async await here because we are attempting to create a user in Firebase
  // and following code logic will be dependant on receieving a response
  try{
    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then((userCredential) => {
      // User successfully signed up and signed in to the app 
      const user = userCredential.user;

      // Clear any existing cookies from the session before creating a new one with new user's ID
      res.clearCookie("uid");
  
      res.cookie('uid',user.uid, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true, sameSite: "None" });
       //.load dashboard page
      res.status(200).json({ authenticated: true, message: "Welcome to FinTrack!", uid: user.uid });
    })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`error: ${errorMessage}, errorCode: ${errorCode}`);
      res.send(`error: ${errorMessage}, errorCode: ${errorCode}`);
});

  } catch(err) {
    console.log(`error: ${err}`);
    res.send(`error: ${err}`);
  }
});


module.exports = router;