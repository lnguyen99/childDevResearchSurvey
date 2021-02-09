import React, { useEffect, useState } from 'react';

export default function DragManyOptions(props) {
    const { questionId, questionPrompt, questionImages, options, onClick } = props; 
    const [show, setShow] = useState(false); 
    const [imgCount, setImgCount] = useState(0); 
    const [response, setResponse] = useState({}); 
    
    const imgLength = options.length; 
    var startTime = new Date(); 

    const onDrag = (e) => {
        let time = new Date() - startTime; //millisecond 
        let qName = `_Q${questionId}_${questionImages[imgCount].imgDesc}`; 
        // write local response 
        imgCount < options.length 
            && setResponse({...response,
                [`Response${qName}`]: e.target.alt, 
                [`Time${qName}`]: time
            });

        setImgCount(imgCount + 1); 
        startTime = new Date(); 
    }; 

    useEffect(() => {
        setShow(false); 
        setTimeout(() => setShow(true), 100); 

        function complete() {
            // write response to central 
            onClick(response); // increment to next question
            console.log({response}); 
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength]); 

    
    // random location of the bird as well 

    // drag drop

    return ( 
        <div>
            <p>{questionPrompt}</p>
            <div className="row align-items-center">
                {(questionImages?.map((item) => 
                (<div className="col-sm mt-3" key={item._id}>
                    <div className="thumbnail" style={{"width": "250px", "height": "300px"}}>
                        <img
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="rounded mx-auto d-block img-fluid"
                        style={{"maxWidth": "100%", "maxHeight": "100%"}}
                        onClick={onDrag}
                        ></img>
                    </div>
                </div>)))}
            </div>
            {(show && imgCount < options.length) ?
                (<div className="d-flex">
                    <div className="thumbnail" style={{"width": "250px", "height": "200px"}}>
                        <img
                        src={options[imgCount].imgLink} 
                        alt={options[imgCount].imgDesc} 
                        className="rounded mx-auto d-block img-fluid"
                        style={{"maxWidth": "100%", "maxHeight": "100%"}}></img>
                    </div>
                </div>) : (null)}
        </div>
    ); 
}