const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Finance = require('../models/finances');

  router.put('/', async (req, res) => {
    // this rout would be triggered by a button to add expenses
    exp = req.body.dailyExpenses
    // get to total daily expenses to subtract from the expenseBudget

    // find the uid from the user's cookies
    let cookies = {};

    const cookiesArray = req.headers.cookie.split(';');

    cookiesArray.forEach((cookie) => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = value;
    });

    uid = (cookies.uid);

    try {
      const userData = await Finance.findOne({uid: uid});
      // query for expenssBudget and subtract daily expenses
      let newExpenseBudget = userData.expenseBudget - exp;
    } catch(err) {
      console.log("error: " + err)
    } 

    try{
      const filter = { uid: uid }
      const update = { expenseBudget: newExpenseBudget };
      // attempt to update expenseBudget with daily expenses

      // `doc` is the document _before_ `update` is applied
      let doc = await Character.findOneAndUpdate(filter, update);
    } catch(err) {
      console.log("error: " + err)
    }

    // app.get('/', (req, res) => {
    //   console.log("Here")
    //   // res.status(200).json({message: "Error"});
    //   // res.status(200).send("HI");
    //   // res.status(200).download("api/index.js"); // was eventually thinking of using the download keyword for users to download their files
    //   res.status(200).render("login");
    // }),

});

module.exports = router;