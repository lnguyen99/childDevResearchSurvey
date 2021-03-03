import React, { useState, useEffect } from 'react';

export default function ChooseHappy(props) {
    const { questionId, questionStatement, questionImages, options, onClick } = props; 
    const [imgCount, setImgCount] = useState(0); 
    const [response, setResponse] = useState({}); 

    const [show, setShow] = useState(false); 
    const [play, setPlay] = useState(true); 

    const questionAudio = new Audio(questionStatement);
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
        setShow(false); 
        if (imgCount < imgLength) {
            setPlay(true);
        }
        startTime = new Date(); 
    }; 

    useEffect(() => {
        if (play && imgCount < imgLength) {
            questionAudio.play()
            questionAudio.onended = function() {
                setPlay(false); 
                setShow(true); 
                startTime = new Date(); 
            };
        }

        function complete() {
            // write response to central + increment to next question
            onClick(response); 
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength, play]); 

    // counterbalance of highlighting  

    return ( 
        <div>
            <div className="row align-items-center">
                {(questionImages?.map((item, idx) => 
                (<div className="col-sm mt-3" key={item._id}>
                    <div className="thumbnail mx-auto"  
                        style={{width: "250px", height: "300px", border: idx === imgCount ? "purple solid 12px" : ""}}>
                        <img
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="mx-auto d-block img-fluid"
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                        ></img>
                    </div>
                </div>)))}
            </div>
            <br />
            {show && <div className="row align-items-center mt-5">
                {(options?.map((item) => 
                (<div className="col" key={item._id}>
                    <div className="thumbnail mx-auto">
                        <img
                        type='button'
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="mx-auto d-block"
                        style={{"width": "115px"}}
                        onClick={onChoose}
                        ></img>
                    </div>
                </div>)))}
            </div>}
        </div>
    ); 
}