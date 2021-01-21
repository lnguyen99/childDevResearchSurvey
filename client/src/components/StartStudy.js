import Question from './Question'; 
import React, { useState } from 'react';

export default function StartStudy({studyId, studyLength, optionCount = 3}) {
  const [questionId, setQuestionId] = useState(1);

  const nextQuestion = () => {
    setQuestionId(questionId + 1); 
  }; 

  return (
    <div>
      {questionId <= studyLength ? (
        <div> 
          <Question studyId={studyId} questionId={questionId} setQuestionId={nextQuestion} />
          <div className="mt-5 mb-4 float-right">
            <a href="/survey" className="btn btn-outline-secondary btn-sm" 
              role="button" 
              aria-pressed="true">Start Over</a>
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