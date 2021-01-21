// @flow

import DragChosenOption from './DragChosenOption'; 
import ChooseHappy from './ChooseHappy'; 
import DragManyOptions from './DragManyOptions'; 
import React, { useEffect, useState } from 'react';

const question_types = {
    DragChosenOption: "DragChosenOption", 
    ChooseHappy: "ChooseHappy", 
    DragManyOptions: "DragManyOptions", 
}; 

export type QuestionType = $Values<typeof question_types>;

export default function QuestionTemplate(props) {
    // console.log({props}); 
    const { questionId, questionType } = props; 
    const [show, setShow] = useState(false); 

    useEffect(() => {
        setShow(false); 
        setTimeout(() => setShow(true), 2000); 
    }, [questionId]); 
    
    if (!show) return null; 
    
    switch(questionType) {
        case question_types.DragChosenOption:
            return <DragChosenOption {...props}/> ; 
        case question_types.ChooseHappy:
            return <ChooseHappy {...props} />; 
        case question_types.DragManyOptions:
            return <DragManyOptions {...props}/>; 
        default:
            return (<div> 
                <div className="row">
                    {(props.options?.map((item) => (
                        item.shownIf <= 3 ? (
                        <div className="col-md-4" key={item._id}>
                            <div className="thumbnail">
                            <a href="#">
                                <img
                                src={item.optionImgLink} 
                                alt={item.optionDesc} 
                                className="img-thumbnail"
                                onClick={props.onClick}></img>
                            </a>
                            <div className="caption text-center">
                                <p>Option {item.optionId}</p>
                            </div>
                            </div>
                        </div>
                        ) : (null)           
                    )))}
                </div>
            </div>); 
    }
}; 