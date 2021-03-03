const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  participantId : {
    type: Number,
    required: true,
    unique: true,
    trim: true, 
  },
  studyId: {
    type: Number,
    required: true,
  },
  optionCount: { //number of options shown to participants 
    type: Number,
    required: true,
  },
  counterBalance: { // true is ASC, false if DESC 
    type: Boolean,
    required: true,
  }
}, {
  strict: false, 
  timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;