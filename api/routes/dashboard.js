const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Finance = require('../models/finances');

// This GET route will grab all the financial data we need for a user
// router.get('/finances', async (req, res) => {

router.get('/', async (req, res) => {
  // implementing async await here because we are making a database call
  // and following code logic will be dependant on receieving a response
  // same logic applies to all asyncronous functions
  const financeData = await Finance.find();

  res.json(financeData);
});

  router.post('/new', (req, res) => {
    let time =  '' + getMonth() + "/" + getDate() + "/" + getFullYear() + '';
    const finances = new Finance({
      uid: req.body.uid,
      income: req.body.income,
      expenseBudget: req.body.expenseBudget,
      savings: req.body.savings,
      investments: req.body.investments,
      timestamp: time
    });

  finances.save();
  console.log('' + getMonth() + "/" + getDate() + "/" + getFullYear() + '')
  res.json(finances);

});

module.exports = router;