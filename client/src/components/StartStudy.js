import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StartStudy({studyId, studyLength, optionCount = 3}) {
  const [query, setQuery] = useState({question: 1});
  const [data, setData] = useState({ question: "", options: [] });

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        // more generic url 
        "http://localhost:5000/study/" + studyId + "?question=" + query.question
      );
      setData(result.data);
    }

    if (query.question <= studyLength) {
      fetchData();
    }
  }, [query, studyId, studyLength]);

  // onClick = (e) => {
  //   setQuery({question: query.question + 1});
  //   //send response to record (participant) 
  // }; 

  return (
    <div>
      {query.question <= studyLength ? (
        <div> 
          <h4>Question {data.questionId}: {data.question}</h4>
          <div className="row">
            {data.options.map((item) => (
              item.shownIf <= optionCount ? (
                <div className="col-md-4" key={item._id}>
                  <div className="thumbnail">
                    <a href="#">
                      <img
                        src={item.optionImgLink} 
                        alt={item.optionDesc} 
                        className="img-thumbnail"
                        onClick={() => setQuery({question: query.question + 1})}></img>
                    </a>
                    <div className="caption text-center">
                      <p>Option {item.optionId}</p>
                    </div>
                    
                  </div>
                </div>
              ) : (<div></div>)           
            ))}
          </div>
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