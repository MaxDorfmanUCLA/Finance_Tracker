const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Finance = require('../models/finances');


// // initializing an instance of cookie-parser so we can access cookies and store JWTs containing User IDs for later use
// const cookieParser = require("cookie-parser");

// app.use(cookieParser());
// app.use(express.cookieParser());




// This GET route will grab all the financial data we need for a user
router.get('/', async (req, res) => {
  // implementing async await here because we are making a database call
  // and following code logic will be dependant on receieving a response
  // same logic applies to all asyncronous functions

  try{

    let cookie = req.cookies;

    await Finance.find(
      { uid: cookie.uid }
    )
      .then((financeData) => {
      res.json(financeData);
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


  router.post('/new', async (req, res) => {

    try {
      const dt = new Date(Date.now());
      let month = dt.getMonth();
      let date = dt.getDate();
      let year = dt.getFullYear();
      let dateToday = `${month}/${date}/${year}`;

      let cookie = req.cookies;

      // query to see if we already have an entry for this user
      await Finance.find(
        { uid: cookie.uid }
      )
        .then( async (financeEntry) => {
          // The below check is checking if we have any entries at all
          if (financeEntry[0] !== undefined ) {
            // Now we have an entry so we need to check if the entry has the same uid 
            // as the current user signed in so we don't make duplicate entries 
            if (financeEntry[0].uid === cookie.uid) {
              // if this passes we have a financeEntry, DO NOT create duplicate for same uid
              console.log("we have a financeEntry, DO NOT create duplicate for same uid");
              res.send("entry already made")
            } else {
              // if the above check fails, we don't have an entry for this user so we make one
              await Finance.create({
                uid: cookie.uid,
                income: req.body.income,
                expenseBudget: req.body.expenseBudget,
                savings: req.body.savings,
                investments: req.body.investments,
                timestamp: dateToday
              })
                .then( (finances) => {
                  res.json(finances)
                }).catch((error) => {
                  console.log(error);
                  res.json(error);
                });
            }
          } else {
            // If the check fails and we don't have any entry, create one 
            await Finance.create({
              uid: cookie.uid,
              income: req.body.income,
              expenseBudget: req.body.expenseBudget,
              savings: req.body.savings,
              investments: req.body.investments,
              timestamp: dateToday
            })
              .then( (finances) => {
                res.json(finances)
              }).catch((error) => {
                console.log(error);
                res.json(error);
              });
          } 
        })
        .catch((error) => {
          console.log(error);
          res.json(error);
        });
    } catch(err) {
      console.log(`error: ${err}`);
      res.send(`error: ${err}`);
    }
});


router.get('/getcookie', (req, res) => {

  let cookie = req.cookies;

  res.json(cookie.uid);  
})

module.exports = router;