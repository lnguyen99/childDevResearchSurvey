const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Study = require('./study.model.js');

const moderatorSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Must have a last name"],
  },
  emailAddress: {
    type: String, 
    required: true, 
    unique: true,
  }, 
  password: {
    type: String,
    required: true,
  },
  studies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Study'}],
}, {
  timestamps: true,
});

const Moderator = mongoose.model('Moderator', moderatorSchema);

module.exports = Moderator;
