import React, { useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { Droppable } from "@hello-pangea/dnd";
import { useLanguage } from "../context/LanguageContext";
import "../styles/Column.css";

const Column = ({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  columnId,
  showAddForm,
  onEditColumnTitle,
  onDeleteColumn,
  dragHandleProps,
  draggableProps,
  innerRef,
}) => {
  const { lang } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(title);

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onEditColumnTitle(input);
    }
    setEditing(false);
  };

  return (
    <div className="column" ref={innerRef} {...draggableProps}>
      <div className="column-header" {...dragHandleProps}>
        {editing ? (
          <form onSubmit={handleTitleSubmit} className="column-title-form">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setInput(title);
                  setEditing(false);
                }
              }}
            />
          </form>
        ) : (
          <h2 onDoubleClick={() => setEditing(true)}>
            <i
              className="fa-solid fa-list-check"
              style={{ marginRight: 6 }}
            ></i>
            {title}{" "}
            <span className="task-count">
              ({tasks.length} {lang === "en" ? "task" : "công việc"})
            </span>
          </h2>
        )}
        <button className="delete-column-btn" onClick={onDeleteColumn}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${
              snapshot.isDraggingOver ? "dragging-over" : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onDelete={() => onDeleteTask(task.id)}
                onEdit={(id, content) => onEditTask(id, content)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {showAddForm && (
        <AddTaskForm
          onAdd={(content, date, priority) =>
            onAddTask(content, date, priority)
          }
        />
      )}
    </div>
  );
};

export default Column;
