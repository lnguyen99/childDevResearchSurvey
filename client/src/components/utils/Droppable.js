import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export default function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 0.5 : 1,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: 150,
    // height: 150,
    // border: '1px solid',
    // margin: 20,
    // borderColor: isOver ? '#4c9ffe' : '#EEE',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}