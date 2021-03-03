import React, { useEffect, useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import Droppable from '../utils/Droppable';
import Draggable from '../utils/Draggable';

export default function DragManyOptions(props) {
    const { questionId, questionPrompt, questionImages, options, onClick } = props; 
    shuffle(options); 

    const [show, setShow] = useState(false); 
    const [imgCount, setImgCount] = useState(0); 
    const [response, setResponse] = useState({}); 
    const [parent, setParent] = useState(null);
    
    const imgLength = options.length; 
    var startTime = new Date(); 

    const draggable = ((show && imgCount < options.length) ?
        <div className=" d-flex mx-auto justify-content-center mt-3">
            <Draggable id={options[imgCount].imgDesc}>
                <div className="thumbnail d-flex" style={{"width": "250px", "height": "250px"}}>
                    <img
                    src={options[imgCount].imgLink} 
                    alt={options[imgCount].imgDesc} 
                    className="rounded mx-auto d-block img-fluid"
                    style={{"maxWidth": "100%", "maxHeight": "100%"}}></img>
                </div>
            </Draggable> 
        </div> : (null)
    );

    const dropppables = (
        questionImages?.map((item) => (
            <div className="col-sm" key={item._id}>
                <Droppable key={item._id} id={item.imgDesc}>
                    {parent === item.imgDesc ? draggable : (
                        <div className="thumbnail d-flex mx-auto" style={{"width": "250px", "height": "300px"}}>
                            <img
                            src={item.imgLink} 
                            alt={item.imgDesc} 
                            className="mx-auto d-block img-fluid"
                            style={{"maxWidth": "100%", "maxHeight": "100%"}}
                            ></img>
                        </div>
                    )}
                </Droppable>
            </div>
        ))
    ); 
    
    function handleDragEnd(event) {
        const {over, active} = event; 
        setParent(over ? over.id : null);
        updateResponse(active?.id, over?.id); 
    }; 

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }      

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

    return (             
        <DndContext onDragEnd={handleDragEnd}>
            <p>{questionPrompt}</p>
            <div className="row align-items-center mx-auto">
                {dropppables}
            </div>
            {!parent ? draggable : null}
        </DndContext>
    ); 
}