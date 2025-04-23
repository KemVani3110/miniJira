import React, { useState, useRef } from "react";
import { Draggable } from "@hello-pangea/dnd";
import "../styles/TaskCard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TaskCard = ({ task, index, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);
  const inputRef = useRef();

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEdit(task.id, newContent);
      setEditing(false);
    } else if (e.key === "Escape") {
      setEditing(false);
      setNewContent(task.content);
    }
  };

  const getDeadlineStatus = (endDateStr) => {
    if (!endDateStr) return null;

    const now = new Date();
    const deadline = new Date(endDateStr);

    now.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diff = deadline - now;

    if (diff === 0) return "near";
    if (diff < 0) return "overdue";
    return null;
  };

  const deadlineStatus = getDeadlineStatus(task.endDate);

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
                <div className="task-main">
                  <span className="task-title" title={task.content}>
                    {task.content}
                  </span>
                </div>

                {task.startDate && task.endDate && (
                  <div className={`task-date ${deadlineStatus}`}>
                    <i className="fa-solid fa-calendar-days"></i>
                    {new Date(task.startDate).toLocaleDateString()} &rarr;{" "}
                    {new Date(task.endDate).toLocaleDateString()}
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
