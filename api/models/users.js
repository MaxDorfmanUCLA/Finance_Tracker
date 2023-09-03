const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: Number,
    required: true
  }
});


// To have userId as schema ID, define a userId column, make it unique
// and then you will have something like a primary index
// That being said, this will break Model.findById.
// You will have to query things using:
// Model.findOne({ documentId: 'unique_key' })
// However, this will give us the ability to use the string we get from Google
// Auth to query a user's financial details

module.exports = mongoose.model('users', UserSchema)