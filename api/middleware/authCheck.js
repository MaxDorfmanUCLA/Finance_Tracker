const env = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

// initializing an instance of cookie-parser so we can access cookies and store JWTs containing User IDs for later use
const cookieParser = require("cookie-parser");

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    Console.log("Not a valid user. User must create an account");
    return res.sendStatus(403);
  }
};

module.exports = authorization