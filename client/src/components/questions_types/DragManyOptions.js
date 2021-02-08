import React, { useEffect, useState } from 'react';

export default function DragManyOptions(props) {
    const { questionPrompt, questionImages, options, onClick } = props; 
    const [show, setShow] = useState(false); 
    const [imgCount, setImgCount] = useState(0); 
    
    const imgLength = options.length; 

    useEffect(() => {
        setShow(false); 
        setTimeout(() => setShow(true), 2000); 

        function complete() {
            // write response to central 
            onClick(); // increment to next question
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength]); 

    const onDrag = () => {
        setImgCount(imgCount + 1);
    }; 

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