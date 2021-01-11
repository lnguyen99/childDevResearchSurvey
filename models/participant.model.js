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
    // unique: true, // not needed if various study running at the same time 
    trim: true, 
    // autoIncrement: true, // check if the id is given or auto assigned 
  },
  studyId: {
    type: Number,
    required: true,
  },
  studyResponses:[{
    type: Map,
    of: ResponseSchema, 
  }],
}, {
  timestamps: true,
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;