import React, { useState, useEffect } from 'react';

export default function ChooseOne(props) {
    const { questionId, questionPrompt, questionImages, onClick } = props; 
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
            onClick(response); 
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength]); 

    return ( 
        <div>
            <p>{questionPrompt}</p>
            <div className="row align-items-center mx-auto">
                {(questionImages?.map((item, idx) => 
                    (<div className="col-sm mx-auto" key={item._id}>
                        <div className="thumbnail mx-auto" 
                            style={{width: "250px", height: "300px", border: idx === imgCount ? "purple solid 12px" : ""}}>
                            <img
                            type="button"
                            src={item.imgLink} 
                            alt={item.imgDesc} 
                            className="mx-auto d-block img-fluid"
                            style={{maxWidth: "100%", maxHeight: "100%"}}
                            onClick={onChoose}
                            ></img>
                        </div>
                    </div>)))}
            </div>            
        </div>
    ); 
}