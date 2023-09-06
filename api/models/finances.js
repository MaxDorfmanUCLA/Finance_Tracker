const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  expenseBudget: {
    type: Number,
    required: true
  },
  savings: {
    type: Number,
    required: true
  },
  investments: {
    type: Number,
    required: true
  },
  timestamp:{
    type: String,
    //required: true
    default: Date.now()
  }
});


// To have userId as schema ID, define a userId column, make it unique
// and then you will have something like a primary index
// That being said, this will break Model.findById.
// You will have to query things using:
// Model.findOne({ documentId: 'unique_key' })
// However, this will give us the ability to use the string we get from Google
// Auth to query a user's financial details

module.exports = mongoose.model('finances', FinanceSchema);