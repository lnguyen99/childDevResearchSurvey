import React, { useState, useEffect } from 'react';

export default function ChooseOne(props) {
    const { questionPrompt, questionImages, options, onClick } = props; 
    const [imgCount, setImgCount] = useState(0); 

    const imgLength = questionImages.length;

    const onChoose = () => {
        // write local response 
        setImgCount(imgCount + 1); 
    }; 

    useEffect(() => {
        function complete() {
            // write response to central 
            onClick(); // increment to next question
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
                        style={{width: "250px", height: "300px", border: idx === imgCount ? "yellow solid 15px" : ""}}>
                        <img
                        type="button"
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="rounded mx-auto d-block img-fluid"
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                        onClick={onChoose}
                        ></img>
                    </div>
                </div>)))}
            </div>            
        </div>
    ); 
}