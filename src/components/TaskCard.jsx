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

  // const renderPriorityIcon = (priority) => {
  //   switch (priority) {
  //     case "low":
  //       return (
  //         <span className="priority-icon" title="Low">
  //           <i className="fa-solid fa-circle" style={{ color: "green" }}></i>
  //         </span>
  //       );
  //     case "medium":
  //       return (
  //         <span className="priority-icon" title="Medium">
  //           <i
  //             className="fa-solid fa-exclamation-circle"
  //             style={{ color: "orange" }}
  //           ></i>
  //         </span>
  //       );
  //     case "high":
  //       return (
  //         <span className="priority-icon" title="High">
  //           <i
  //             className="fa-solid fa-exclamation-triangle"
  //             style={{ color: "red" }}
  //           ></i>
  //         </span>
  //       );
  //     default:
  //       return null;
  //   }
  // };

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
                  <span>{task.content}</span>
                  {/* {task.priority && renderPriorityIcon(task.priority)} */}
                </div>

                {task.startDate && task.endDate && (
                  <div className={`task-date ${deadlineStatus}`}>
                    <i
                      className="fa-solid fa-calendar-days"
                      style={{ marginRight: 4 }}
                    ></i>
                    {new Date(task.startDate).toLocaleDateString()} &rarr;{" "}
                    {new Date(task.endDate).toLocaleDateString()}
                    {deadlineStatus === "near" && (
                      <i
                        className="fa-solid fa-triangle-exclamation warning-icon"
                        title="Sắp đến hạn"
                        style={{ marginLeft: 6 }}
                      ></i>
                    )}
                    {deadlineStatus === "overdue" && (
                      <i
                        className="fa-solid fa-circle-exclamation overdue-icon"
                        title="Đã quá hạn"
                        style={{ marginLeft: 6 }}
                      ></i>
                    )}
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
