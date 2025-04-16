import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import '../styles/TaskCard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TaskCard = ({ task, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(task.content);
  };

  const handleSave = () => {
    if (editedContent.trim()) {
      onEdit(task.id, editedContent.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
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
          {isEditing ? (
            <input
              className="task-edit-input"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleCancel}
              autoFocus
            />
          ) : (
            <div className="task-content" onDoubleClick={handleEdit}>
              {task.content}
            </div>
          )}
          <button className="delete-btn" onClick={onDelete}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
