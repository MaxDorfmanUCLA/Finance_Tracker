const env = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require("./routes/auth");
const dashRouter = require("./routes/dashboard");
const userActionRouter = require("./routes/userAction");
// initializing an instance of cookie-parser so we can access cookies and store JWTs containing User IDs for later use
const cookieParser = require("cookie-parser");

// initializing an instance of express as our main routing framework
const app = express();

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

// connecting to MongoDB instance using Mongoose ODM for use of schemas, ease of validation, instance methods, and Returning results
mongoose.connect("mongodb+srv://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASS + "@cluster0.nk9msod.mongodb.net/?retryWrites=true&w=majority", { 
  // using environment variables for DB connection string for security 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("You successfully connected to MongoDB via Mongoose!"))
  .catch((err) => console.log("error: " + err));

const corsOptions ={
  origin:'http://localhost:3001', 
  //access-control-allow-origin: 'http://localhost:3001',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// use routers that have been seperated into different files for clarity and optimization
app.use("/sign", authRouter);
app.use("/finances", dashRouter);
app.use("/expenses", userActionRouter);


// Using environment variable to determine development environment 
// node.js server will not print "Server started on port 3000" unless we are in dev environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));