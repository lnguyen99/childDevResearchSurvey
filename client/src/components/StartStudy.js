import React, { useEffect, useState } from "react";
import QuestionTemplate from './questions_types/QuestionTemplate'; 

import axios from "axios";

export default function StartStudy({participantId, studyId, studyLength, optionCount, counterBalance}) {
  const [questionId, setQuestionId] = useState(1);
  const [data, setData] = useState({});
  const [body, setBody] = useState({participantId, studyId, optionCount, counterBalance}); 

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

  useEffect(() => {    
    async function fetchData() {
      axios.get("/api/study/" + studyId, {
        params: {
          question: questionId
        }
      }).then(res => {
        const obj = res.data; 
        const questionImages = obj.questionImages?.filter(img => img.shownIf <= optionCount); 
        // obj.questionType !== "DragChosenOption" 
        //   ? obj.questionImages?.filter(img => img.shownIf <= optionCount) 
        //   : obj.questionImages; 

        const correctDescription = obj.questionDescription?.length > 1 ? 
          obj.questionDescription?.filter(obj => {
              return obj.count === questionImages.length
          })[0] : obj.questionDescription[0]; 
        const descriptionUrl = correctDescription?.audioLink; 

        // true is ASC, false if DESC
        const order = counterBalance ? 1 : -1; 
        questionImages.sort((a,b) => 
          (a.point > b.point) ? order : ((b.point > a.point) ? (-1 * order) : 0)
        ); 
        
        setData({...obj, questionImages, descriptionUrl}); 

      }).catch(function (error) {
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
  }, [studyId, questionId, studyLength, optionCount, counterBalance]);

  return (
    <div>
      {questionId <= studyLength ? (
            <QuestionTemplate studyId={studyId} 
              onClick={nextQuestion} 
              {...data}/> 
      ) : (
        <div className="text-center mt-5">
          <h3><br/>The survey is finished. Thanks for completing!<br/></h3>
          <button onClick={() => window.location='/'} className="btn btn-outline-primary mt-5">Go Back To Homepage</button>
        </div>
      )}
    </div>
  );
}