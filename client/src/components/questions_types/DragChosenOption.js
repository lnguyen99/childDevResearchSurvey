import React, { useState, useEffect } from 'react';
// import {DndContext} from '@dnd-kit/core';
// import Droppable from '../utils/Droppable';
// import Draggable from '../utils/Draggable';

export default function DragChosenOption(props) {
    const { questionId, questionPrompt, questionImages, options, onClick } = props; 
    const [imgCount, setImgCount] = useState(0); 
    const [response, setResponse] = useState([]); 
    // const [parent, setParent] = useState(null);

    const imgLength = options.length; 
    var startTime = new Date(); 

    // function handleDragEnd(event) {
    //     const {over, active} = event; 
    //     setParent(over ? over.id : null);
    //     updateResponse(active?.id, over?.id); 
    //     console.log({event}); 
    // }; 

    // const updateResponse = (question, answer) => {
    //     let time = new Date() - startTime; //millisecond 
    //     let qName = `_Q${questionId}_${question}`; 
    //     // write local response 
    //     imgCount < options.length 
    //         && setResponse({...response,
    //             [`Response${qName}`]: answer, 
    //             [`Time${qName}`]: time
    //         });

    //     setImgCount(imgCount + 1); 
    //     setParent(null); 
    //     startTime = new Date(); 
    // }; 

    const onDrag = (e) => {
        let time = new Date() - startTime; //millisecond 
        let qName = `_Q${questionId}_${options[imgCount].imgDesc}`; 
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
        function complete() {
            // write response to central 
            onClick(response); // increment to next question
            console.log({response}); 
        }

        if (imgCount >= imgLength) {
            complete(); 
        }
    }, [imgCount, imgLength]); 

    return ( 
        <div>
            <p>{questionPrompt}</p>
            <div className="row align-items-center">
                {(questionImages?.map((item, idx) => 
                (<div className="col-sm mx-auto" key={item._id}>
                    <div className="thumbnail mx-auto" 
                        style={{width: "300px", height: "300px", border: idx === imgCount ? "purple solid 12px" : ""}}>
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
            <div className="row align-items-center mt-2">
                {(options?.map((item) => 
                (<div className="col-md-4 d-flex mx-auto" key={item._id} type="button">
                    <div className="thumbnail d-flex mx-auto" style={{width: "300px", height : "150px"}}>
                        <img
                        src={item.imgLink} 
                        alt={item.imgDesc} 
                        className="mx-auto d-block img-fluid"
                        style={{"maxWidth": "100%", "maxHeight": "100%"}}
                        onClick={onDrag}
                        ></img>
                    </div>
                </div>)))}
            </div>
        </div>
    ); 
}

// const draggables = options?.map((item, idx) => 
//         <div className="col-md-4 d-flex mt-3" key={item._id}>
//             <Draggable id={item.idx}>
//                 <div className="thumbnail d-flex" style={{width: "250px", height: "150px"}}>
//                     <img
//                     src={item.imgLink} 
//                     alt={item.imgDesc} 
//                     className="mx-auto d-block img-fluid"
//                     style={{"maxWidth": "100%", "maxHeight": "100%"}}></img>
//                 </div>
//             </Draggable> 
//         </div>); 

//     const droppables = questionImages?.map((item, idx) => 
//         <div className="col-sm mx-auto" key={item._id}>
//             {(idx === imgCount) ? (<Droppable key={item._id} id={item.idx}>
//                 {parent === item.idx ? draggables[parent] : (
//                     <div className="thumbnail" 
//                         style={{width: "250px", height: "300px", border: "purple solid 15px"}}>
//                         <img
//                         src={item.imgLink} 
//                         alt={item.imgDesc} 
//                         className="mx-auto d-block img-fluid"
//                         style={{maxWidth: "100%", maxHeight: "100%"}}
//                         ></img>
//                     </div>)}
//             </Droppable>) : 
//                 (<div className="thumbnail" 
//                     style={{width: "250px", height: "300px"}}>
//                     <img
//                     src={item.imgLink} 
//                     alt={item.imgDesc} 
//                     className="mx-auto d-block img-fluid"
//                     style={{maxWidth: "100%", maxHeight: "100%"}}
//                     ></img>
//                 </div>)}
//         </div>);  

//     return ( 
//         <DndContext onDragEnd={handleDragEnd}>
//             <p>{questionPrompt}</p>
//             <div className="row align-items-center">
//                 {droppables}
//             </div>
//             {!parent ? <div className="row align-items-center">{draggables}</div>: null}
//         </DndContext>
//     ); 