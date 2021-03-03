const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Study = require('./study.model.js');

const questionSchema = new Schema({
  study_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Study' },
  questionId: {
    type: Number, 
    required: true, 
  }, 
  questionPrompt: String,
  questionStatement: {
    type: String, 
    required: true,
  },
  questionType: {
    type: String,
    enum: ['DragManyOptions', 'DragChosenOption', 'ChooseHappy', 'ChooseOne'],
    required: true, 
  },
  questionImages: [{
    imgLink: String, 
    imgDesc: String,
    shownIf: Number, // shown if the number of options is equal to this number
    point: Number, 
  }],
  options: [{
    imgLink: String, // link to image
    imgDesc: String, // description of image, aka alt-text 
  }], 
  questionDescription: [{
    count: Number, // number of options shown
    audioLink: String, // url to correct count  
  }], 
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;