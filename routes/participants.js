const router = require('express').Router();
const Participant = require('../models/participant.model');
const Study = require('../models/study.model');

router.route('/start').post((req, res) => {
  const participantId = req.body.participantId;
  const studyId = req.body.studyId;

  Study.findOne({studyId}).exec()
    .then(function(study) {
      if (study == null) {
        throw "Study not found"; 
      } else {
        Participant.findOne({participantId}).exec()
          .then((p) => {
            if (p === null) {
              res.json({
                message: "Participant updated!", 
                study: {
                  id: study.studyId, 
                  name: study.studyName, 
                  description: study.studyDescription,
                  instruction: study.studyInstruction, 
                  studyLength: study.questions.length,
                }
              })
            }
          }).catch(err => res.status(400).json('Error: ' + err));
      }
    }).catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/finish').post((req, res) => {
  const studyId = req.body.body.studyId;

  Study.findOne({studyId}).exec()
    .then(function(study) {
      if (study == null) {
        throw "Study not found"; 
      } else {
        const newParticipant = new Participant(req.body.body);
        newParticipant.save()
          .then((p) => res.json({
            message: "Responses submitted. Thank you!" 
          })).catch(err => res.status(400).json('Error: ' + err));
      }
    }).catch(err => res.status(400).json('Error: ' + err)); 
});

module.exports = router;