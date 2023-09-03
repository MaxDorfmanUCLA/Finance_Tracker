const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FinanceSchema = new Schema({
  uid: {
    type: Number,
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
  }
})


// FinanceSchema.index({ _id: 1, userId: 1 }, { unique: true })

// const financeModel = mongoose.model('finance', FinanceSchema);

// const autoIncrementModelID = function (modelName, doc, next) {
//   financeModel.findByIdAndUpdate(        // ** Method call begins **
//     modelName,                           // The ID to find for in counters model
//     { $inc: { userId: 1 } },             // The update
//     { new: true, upsert: true },         // The options
//     function(error, finance) {           // The callback
//       if(error) return next(error);

//       doc.id = finance.seq;
//       next();
//     }
//   );                                     // ** Method call ends **
// }

// module.exports = autoIncrementModelID;

// To have userId as schema ID, define a secondary index, make it unique
// and then you will have something like a primary index
// That being said, this will break Model.findById.
// You will have to query things using:
// Model.findOne({ documentId: 'unique_key' })

//module.exports = FinanceSchema;
module.exports = mongoose.model('finances', FinanceSchema)