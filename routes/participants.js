const converter = require('json-2-csv');
const router = require('express').Router();

const Participant = require('../models/participant.model');
const Study = require('../models/study.model');
const Registration = require('../models/registration.model');

const max_diff = process.env.MAXIMUM_DIFFERENCE_RANDOMIZED; 

router.route('/start').post((req, res) => {
  const participantId = req.body.participantId;
  const studyId = req.body.studyId;

  Study.findOne({studyId}).exec()
    .then(function(study) {
      if (study == null) {
        throw "Study not found"; 
      } else {
        Registration.findOne({participantId}).exec()
        // check if the ID is unique 
          .then((p) => {
            if (p === null) {
              const newRegistration = new Registration(req.body);
              newRegistration.optionCount = getOptionCount(studyId, study.optionCount); 
              newRegistration.counterBalance = getCounterBalance(studyId, newRegistration.optionCount); 
              newRegistration.save()
                .then((p) => {
                  res.json({
                    message: "Start study!", 
                    study: {
                      id: studyId, 
                      name: study.studyName, 
                      description: study.studyDescription,
                      instruction: study.studyInstruction, 
                      studyLength: study.questions.length,
                      optionCount: p.optionCount,
                      counterBalance: p.counterBalance, 
                    }
                  }); 
                }).catch(err => res.status(400).json('Error: ' + err));
            } else {
              res.json({
                message: "Error: Duplicate participant", 
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
        Registration.findOne({}).exec().then((reg) => {
          if (reg == null) {
            res.status(400).json('Error: Registration not found'); 
            throw "Registration not found"; 
          }
          const newParticipant = new Participant(req.body.body);
          newParticipant.save()
            .then((p) => res.json({
              message: "Responses submitted. Thank you!" 
            })).catch(err => res.status(400).json('Error: ' + err));
          })
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
      // convert JSON array to CSV string
      converter.json2csv(arr, (err, csv) => {
        if (err) {
          throw err;
        }

        res.json(csv);
      }, {keys});
    }).catch(err => res.status(400).json('Error: ' + err));
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

const getOptionCount = (studyId, studyOptionCounts) => {
  const arr_count = studyOptionCounts.reduce((acc, cur) => {
    Participant.count({ studyId, optionCount: cur }, (err, count) => {
      if (err) {
        res.status(400).json('Error: ' + err);
        console.log("[ERROR] " + err); 
      }
      acc.push(count); 
    })
    return acc; 
  }, []); 

  if (arr_count[0] - arr_count[1] > max_diff) {
    return studyOptionCounts[1]; 
  } else if (arr_count[1] - arr_count[0] > max_diff) {
    return studyOptionCounts[0]; 
  } else {
    return studyOptionCounts[randomInteger(0, 1)]; 
  }
}

const getCounterBalance = (studyId, optionCount) => {
  var counterBalance = false; 
  Participant.count({ studyId, optionCount }, (err, total_count) => {
    if (err) {
      res.status(400).json('Error: ' + err);
      console.log("[ERROR] " + err); 
    }

    const random_boolean = Math.random() < 0.5;
    Participant.count({ studyId, optionCount, counterBalance: random_boolean}, (err, count) => {
      if (err) {
        res.status(400).json('Error: ' + err);
        console.log("[ERROR] " + err); 
      } 

      counterBalance =  (2*count - total_count < max_diff) ? random_boolean : !random_boolean; 
    }); 
  })
  return counterBalance; 
}

const randomInteger = (min, max) => {
  // random number between min and max (both included)
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = router;