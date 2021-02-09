import React, { useState, useEffect } from 'react';

export default function ChooseHappy(props) {
    const { questionId, questionPrompt, questionImages, options, onClick } = props; 
    const [imgCount, setImgCount] = useState(0); 
    const [response, setResponse] = useState({}); 

    const imgLength = questionImages.length;
    var startTime = new Date(); 

    const onChoose = (e) => {
        let time = new Date() - startTime; //millisecond 
        let qName = `_Q${questionId}_${questionImages[imgCount].imgDesc}`; 

        setResponse({...response,
            [`Response${qName}`]: e.target.alt, 
            [`Time${qName}`]: time
        }); 

        setImgCount(imgCount + 1); 
        startTime = new Date(); 
    }; 

    useEffect(() => {
        function complete() {
            // write response to central + increment to next question
            onClick(response); 
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength]); 

    // counterbalance of highlighting  

    // drag drop

    return ( 
        <div>
            <p>{questionPrompt}</p>
            <div className="row align-items-center">
                {(questionImages?.map((item, idx) => 
                (<div className="col-sm mt-3" key={item._id}>
                    <div className="thumbnail" 
                        style={{width: "250px", height: "300px", border: idx === imgCount ? "purple solid 15px" : ""}}>
                        <img
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="rounded mx-auto d-block img-fluid"
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                        ></img>
                    </div>
                </div>)))}
            </div>
            <br />
            <div className="row align-items-center mt-5">
                {(options?.map((item) => 
                (<div className="col" key={item._id}>
                    <div className="thumbnail">
                        <img
                        type='button'
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="rounded mx-auto d-block"
                        style={{"width": "115px"}}
                        onClick={onChoose}
                        ></img>
                    </div>
                </div>)))}
            </div>
        </div>
    ); 
}