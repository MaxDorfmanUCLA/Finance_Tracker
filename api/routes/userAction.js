const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Finance = require('../models/finances');

  router.put('/', async (req, res) => {
    try {
    // this rout would be triggered by a button to add expenses
    exp = req.body.dailyExpenses
    // get to total daily expenses to subtract from the expenseBudget

    // find the uid from the user's cookie
    let cookie = req.cookies;
    // declare a new expense budget as the old one minus expenses
    let newExpenseBudget;

    await Finance.find(
      { uid: cookie.uid }
    )
      .then((financeEntry) => {
        newExpenseBudget = financeEntry[0].expenseBudget - exp
      });


    await Finance.updateOne({uid: cookie.uid}, 
      {expenseBudget: newExpenseBudget}) 
      
      .then((data) => {
        console.log("Update data : ", data);
        res.send(data)
      });
        
    } catch(error) {
        console.log(error);
        res.json(error);
    };

});

module.exports = router;