const router = require('express').Router();
const Study = require('../models/study.model');
const Question = require('../models/question.model');

router.route('/add').post((req, res) => {
  const newStudy = new Study(req.body);

  newStudy.save()
    .then(() => res.json('New Study added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    //then update moderators to reflect the new studies 
});

router.route('/:id').get((req, res) => {
  Study.findOne({studyId: req.params.id})
    .then(study => {
      if (req.query.question == null) {
        res.json({
          study: {
            id: study.studyId, 
            name: study.studyName, 
            description: study.studyDescription,
            instruction: study.studyInstruction, 
            studyLength: study.questions.length, 
          }
        });
      } else {
        Question.findOne({study_id: study._id, questionId: req.query.question})
          .then(q => {
            if (q == null) {
              throw "Question Not Found"
            } else {
              res.json(q); 
            }
          }).catch(err => res.status(400).json('Error: ' + err));
      }
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  Study.findOne({studyId: req.params.id}).exec()
    .then(function(study) {
      if (study == null) {
        throw "Study not found"; 
      } else {
        // create new question
        const newQuestion = new Question(req.body);
        newQuestion.study_id = study._id; 
        
        newQuestion.save()
          .then((question) => {
            res.json({
              message: "Question Created!", 
            }); 
          }).catch(err => res.status(400).json('Error: ' + err));

        study.questions.push(newQuestion._id);
        study.save();
      }
    }).catch(err => res.status(400).json('Error: ' + err)); 
});

// edit question
// update question (change prompt, change responses, etc.)
// TODO

module.exports = router;