import React, { useState, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import '../styles/TaskCard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TaskCard = ({ task, index, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);
  const inputRef = useRef();

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEdit(task.id, newContent);
      setEditing(false);
    } else if (e.key === 'Escape') {
      setEditing(false);
      setNewContent(task.content);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-content" onDoubleClick={handleDoubleClick}>
            {editing ? (
              <input
                className="task-edit-input"
                value={newContent}
                ref={inputRef}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => setEditing(false)}
              />
            ) : (
              <>
                <div>{task.content}</div>
                {task.date && (
                  <div className="task-date">
                    <i className="fa-solid fa-calendar-days" style={{ marginRight: 4 }}></i>
                    {new Date(task.date).toLocaleDateString()}
                  </div>
                )}
              </>
            )}
          </div>

          <button className="delete-btn" onClick={onDelete}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
