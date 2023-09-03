const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');


// Creating our Google Firebase auth instance with our generated account key
const admin = require("firebase-admin");
const credentials = require("../serviceAccountKey.json")

// If the user's uid is present in cookies, they alreay have an account, are signed in, and able to view the dashboard 
// Otherwise, have them create an account by taking them to the sign in page. 

router.post('/in', async (req, res) => {
  // implementing async await here because we are attempting to create a user in Firebase
  // and following code logic will be dependant on receieving a response
  // idToken comes from the client app
  app.get("/findname", async (req, res)=>{
    try{
      if(req.query.name){
        let singlePerson = await Person.find({name: req.query.name}).exec();
        return res.json(singlePerson);
      }else{
        res.json({error: "No name query found inside request"})
      }
    }catch(error){
      throw error
    }
  })
      //.load signup page

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

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

module.exports = router;