import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import '../styles/TaskCard.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-content">{task.content}</div>
          <button className="delete-btn" onClick={onDelete}>
          <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
