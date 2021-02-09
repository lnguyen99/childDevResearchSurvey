import React, { useEffect, useState } from "react";
import QuestionTemplate from './questions_types/QuestionTemplate'; 

import axios from "axios";

export default function StartStudy({participantId, studyId, studyLength, optionCount = 3}) {
  const [questionId, setQuestionId] = useState(3);
  const [data, setData] = useState({});
  const [body, setBody] = useState({participantId, studyId, optionCount}); 

  const nextQuestion = (res) => {
    setQuestionId(questionId + 1); 
    setBody({...body, ...res}); 
  }; 

  async function submitResponse() {
    axios.post('/api/participants/finish', {body})
      .then(res => console.log(res))
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
    });   
  }
  
  // TODO randomize location of images + counterbalance 
  // by updating the questionImages, options and shownIf at this stage
  // no need to pass optionCount because remove all larger number here (filter)

  useEffect(() => {    
    async function fetchData() {
      axios.get("/api/study/" + studyId, {
        params: {
          question: questionId
        }
      }).then(res => setData(res.data)
      ).catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }); 
    }

    if (questionId <= studyLength) {
      fetchData(); 
    } else {
      submitResponse(); 
    }
  }, [studyId, questionId, studyLength]);

  return (
    <div>
      {questionId <= studyLength ? (
        <div> 
          <div>
            <QuestionTemplate studyId={studyId} 
              onClick={nextQuestion} 
              {...data}/> 
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h3><br/>The survey is finished. Thanks for completing!<br/></h3>
          <button onClick={() => window.location='/'} className="btn btn-outline-primary mt-5">Go Back To Homepage</button>
        </div>
      )}
    </div>
  );
}