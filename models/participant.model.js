const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const ResponseSchema = new Schema({
//   question: String,
//   answer: String, 
//   time: Number // time in milliseconds 
// });

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
  // responses:[{
  //   type: Map,
  //   of: ResponseSchema, 
  // }],
}, {
  strict: false, 
  timestamps: true,
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;