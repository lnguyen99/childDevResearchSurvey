const converter = require('json-2-csv');
const fs = require('fs');
const router = require('express').Router();

const Participant = require('../models/participant.model');
const Study = require('../models/study.model');

// check if the ID is unique 
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


// write participant's response to db 
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


// download participant's response of a specific db 
// download response info for a study 
router.route('/download').get((req, res) => {
  const studyId = req.query.studyId;

  Participant.find({studyId})
    .then(studies => {
      const {keys, arr} = getAllDocFields(studies); 
      const filePath = `files/study${studyId}.csv`; 
      // convert JSON array to CSV string
      converter.json2csv(arr, (err, csv) => {
        if (err) {
          throw err;
        }
        fs.writeFile(filePath, csv, function(err) {
          if (err) throw err;
          console.log('file saved');
        });      
      }, {keys});
      return filePath; 
    }).then((filePath) => res.download(filePath)
    ).catch(err => res.status(400).json('Error: ' + err));
});


const getAllDocFields = (objArr) => {
  let headers = new Set(); 
  let arr = []; 
  objArr.map(obj => {
    for (t in obj._doc) {
      headers.add(t); 
    }
    arr.push(obj._doc); 
  })
  return {keys: Array.from(headers), arr}; 
}

module.exports = router;