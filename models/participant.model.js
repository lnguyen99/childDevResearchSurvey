const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  question: String,
  response: String, 
});

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
  responses:[{
    type: Map,
    of: ResponseSchema, 
  }],
}, {
  timestamps: true,
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;