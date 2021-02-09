import React, { useEffect, useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import Droppable from '../utils/Droppable';
import Draggable from '../utils/Draggable';

export default function DragManyOptions(props) {
    const { questionId, questionPrompt, questionImages, options, onClick } = props; 

    const [show, setShow] = useState(false); 
    const [imgCount, setImgCount] = useState(0); 
    const [response, setResponse] = useState({}); 
    const [parent, setParent] = useState(null);
    
    const imgLength = options.length; 
    var startTime = new Date(); 

    const draggable = ((show && imgCount < options.length) ?
        <Draggable id={options[imgCount].imgDesc}>
            <div className="d-flex m-3">
                <div className="thumbnail" style={{"width": "250px", "height": "200px"}}>
                    <img
                    src={options[imgCount].imgLink} 
                    alt={options[imgCount].imgDesc} 
                    className="rounded mx-auto d-block img-fluid"
                    style={{"maxWidth": "100%", "maxHeight": "100%"}}></img>
                </div>
            </div>
        </Draggable> : (null)
    );

    const dropppables = (
        questionImages?.map((item) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <Droppable key={item._id} id={item.imgDesc}>
                {parent === item.imgDesc ? draggable : (<div className="col-sm mt-3">
                    <div className="thumbnail" style={{"width": "250px", "height": "300px"}}>
                        <img
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="rounded mx-auto d-block img-fluid"
                        style={{"maxWidth": "100%", "maxHeight": "100%"}}
                        ></img>
                    </div>
                </div>)}
            </Droppable>
        ))
    ); 
    
    function handleDragEnd(event) {
        const {over, active} = event; 
        setParent(over ? over.id : null);
        updateResponse(active?.id, over?.id); 
    }; 

    const updateResponse = (question, answer) => {
        let time = new Date() - startTime; //millisecond 
        let qName = `_Q${questionId}_${question}`; 
        // write local response 
        imgCount < options.length 
            && setResponse({...response,
                [`Response${qName}`]: answer, 
                [`Time${qName}`]: time
            });

        setImgCount(imgCount + 1); 
        setParent(null); 
        startTime = new Date(); 
    }; 

    useEffect(() => {
        setShow(false); 
        setTimeout(() => setShow(true), 100); 

        function complete() {
            // write response to central 
            onClick(response); // increment to next question
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength]); 

    // random location of the bird as well 

    return (             
        <DndContext onDragEnd={handleDragEnd}>
            <p>{questionPrompt}</p>
            <div className="row align-items-center">
                {dropppables}
            </div>
            {!parent ? draggable : null}
        </DndContext>
    ); 
}