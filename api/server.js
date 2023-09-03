const env = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// initializing an instance of cookie-parser so we can access cookies and store JWTs containing User IDs for later use
const cookieParser = require("cookie-parser");

// initializing an instance of express as our main routing framework
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(cors);
app.use(cookieParser());
// app.set('view engine', 'ejs');

// Creating our Google Firebase auth instance with our generated account key
const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json")

// using try/catch to catch any errors we might encounter while trying to connect to Firebase Auth
try {
  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });
} catch(err) {
  console.log("error: " + err);
}

app.post('/signup', async (req, res) => {
  // implementing async await here because we are attempting to create a user in Firebase
  // and following code logic will be dependant on receieving a response
  try{
    const userResponse = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: false,
      disabled: false
    });

    const token = jwt.sign({ uid: userResponse.uid}, process.env.JWT_SECRET_KEY);
    return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "dev", // may update to production later
    })
    .status(200)
    .json({ message: "Signed up successfully 👌" });
    //.load dashboard page

  } catch(err) {
    console.log("error: " + err);
  }
});




// use the user's uid from their JWT to check if they alreay have an account. 
//Otherwise, have them create an account

app.post('/signin', async (req, res) => {
  // implementing async await here because we are attempting to create a user in Firebase
  // and following code logic will be dependant on receieving a response
  // idToken comes from the client app
  getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      // ...
    })
    .catch((err) => {
      console.log("error: " + err);
    });
      //.load dashboard page

});








// This GET route will grab all the financial data we need for a user
app.get('/finances', async (req, res) => {

  const financeData = await Finance.find();

  res.json(financeData);
});


// connecting to MongoDB instance using Mongoose ODM for use of schemas, ease of validation, instance methods, and Returning results
mongoose.connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.nk9msod.mongodb.net/?retryWrites=true&w=majority", { 
  // using environment variables for DB connection string for security 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("You successfully connected to MongoDB via Mongoose!"))
  .catch((err) => console.log("error: " + err));

 

const Finance = require('./models/finances');

app.get('/finances', async (req, res) => {
  // implementing async await here because we are making a database call
  // and following code logic will be dependant on receieving a response
  const financeData = await Finance.find();

  res.json(financeData);
});

  // implementing async await here because we are making a database call
  // and following code logic will be dependant on receieving a response

app.post('/finances/new', (req, res) => {
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


// app.get('/', (req, res) => {
//   console.log("Here")
//   // res.status(200).json({message: "Error"});
//   // res.status(200).send("HI");
//   // res.status(200).download("api/index.js");
//   res.status(200).render("login");
// }),

// Using environment variable to determine development environment 
// node.js server will not print "Server started on port 3000" unless we are in dev environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
