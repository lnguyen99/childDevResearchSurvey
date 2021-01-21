// @flow 
import React, { useEffect, useState } from "react";
import QuestionTemplate from './questions_types/QuestionTemplate'; 

import axios from "axios";
  
type Props = {
    participantId?: number, 
    questionId: number, 
    setQuestionId: () => {}, 
    studyId: number, 
}; 

export default function Question(props: Props): React$Element<any> {
  const { questionId, setQuestionId, studyId } = props; 
  const [data, setData] = useState({});

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

    fetchData(); 

  }, [studyId, questionId]);

  return (
    <div>
        {/* Question Prompt */}
        <h4>Prompt: {questionId}</h4>
        <h5>{data.question}</h5>
        <QuestionTemplate {...data} studyId={studyId} onClick={setQuestionId} /> 
    </div>
  );
}