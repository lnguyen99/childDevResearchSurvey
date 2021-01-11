const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Question = require('./question.model.js');
const Moderator = require('./moderator.model.js');

const studySchema = new Schema({
  studyId: {
    type: Number,
    required: true,
    unique: true, 
  },
  studyName: {
    type: String, 
    required: true, 
  }, 
  studyDescription: {
    type: String, 
  }, 
  studyInstruction: {
    type: String, 
  }, 
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Moderator' }],
  // For example, [3,5] means participants can be randomly shown 3 or 5 options
  // assuming the number of options shown is fixed throughout the study
  // i.e. a participant will be shown 5 options for each question of the study
  optionCount: [Number], 
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
}, {
  timestamps: true,
});

const Study = mongoose.model('Study', studySchema);

module.exports = Study;