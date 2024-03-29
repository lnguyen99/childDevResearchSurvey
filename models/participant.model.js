const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Registration = require('./registration.model.js');

const participantSchema = new Schema({
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
  }, 
  registration: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration' },
}, {
  strict: false, 
  timestamps: true,
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;