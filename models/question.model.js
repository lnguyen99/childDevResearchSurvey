const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Study = require('./study.model.js');

const questionSchema = new Schema({
  study_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Study' },
  questionId: {
    type: Number, 
    required: true, 
  }, 
  question: {
    type: String, 
    required: true,
  },
  options: [{
    optionId: Number, 
    optionImgLink: String, // link to image
    optionDesc: String, // description of image, aka alt-text 
    shownIf: Number, // shown if the number of options is equal to this number
  }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;