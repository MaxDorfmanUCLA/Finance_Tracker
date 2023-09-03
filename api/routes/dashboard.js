const env = require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");

// Creating our Google Firebase auth instance with our generated account key
const admin = require("firebase-admin");
const credentials = require("../serviceAccountKey.json")

const Finance = require('../models/finances');

// This GET route will grab all the financial data we need for a user
//router.get('/finances', async (req, res) => {

router.get('/', async (req, res) => {
  // implementing async await here because we are making a database call
  // and following code logic will be dependant on receieving a response
  const financeData = await Finance.find();

  res.json(financeData);
});

  // implementing async await here because we are making a database call
  // and following code logic will be dependant on receieving a response

  router.post('/new', (req, res) => {
  const finances = new Finance({
    uid: req.body.uid,
    income: req.body.income,
    expenseBudget: req.body.expenseBudget,
    savings: req.body.savings,
    investments: req.body.investments
  });

  finances.save();

  res.json(finances);

});

module.exports = router;