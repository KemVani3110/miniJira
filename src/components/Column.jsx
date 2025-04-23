import React, { useState, useEffect } from "react";
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
  onEditColumnTitle,
  onDeleteColumn,
  dragHandleProps,
  draggableProps,
  innerRef,
}) => {
  const { lang } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(title);
  const [showForm, setShowForm] = useState(false);
  const [fadeClass, setFadeClass] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onEditColumnTitle(input);
    }
    setEditing(false);
  };

  // Hiệu ứng popup add task
  useEffect(() => {
    if (showForm) {
      setFadeClass("show");
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          handleCloseForm();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    } else {
      setFadeClass("hide");
    }
  }, [showForm]);

  const handleCloseForm = () => {
    setFadeClass("hide");
    setTimeout(() => setShowForm(false), 200);
  };

  const handleDeleteColumn = () => {
    setShowDeleteConfirm(false);
    setTimeout(() => {
      setConfirmVisible(false);
      onDeleteColumn(); // Xoá cột
    }, 300);
  };

  const openDeleteConfirm = () => {
    setConfirmVisible(true);
    setTimeout(() => setShowDeleteConfirm(true), 10);
  };

  const closeDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setTimeout(() => setConfirmVisible(false), 300);
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
            {title}
            <span className="task-count">
              ({tasks.length} {lang === "en" ? "task" : "công việc"})
            </span>
          </h2>
        )}
        <button className="delete-column-btn" onClick={openDeleteConfirm}>
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

      {confirmVisible && (
        <div
          className={`confirm-popup-overlay ${showDeleteConfirm ? "show" : ""}`}
        >
          <div className="confirm-popup">
            <p>
              {lang === "en"
                ? "Are you sure you want to delete this column?"
                : "Bạn có chắc muốn xoá cột này không?"}
            </p>
            <div className="confirm-buttons">
              <button className="confirm-btn yes" onClick={handleDeleteColumn}>
                {lang === "en" ? "Yes" : "Có"}
              </button>
              <button className="confirm-btn no" onClick={closeDeleteConfirm}>
                {lang === "en" ? "No" : "Không"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="add-task-popup-wrapper">
        <button
          className="toggle-add-task-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <i className={`fa-solid ${showForm ? "fa-times" : "fa-plus"}`}></i>{" "}
          {showForm
            ? lang === "en"
              ? "Close"
              : "Đóng"
            : lang === "en"
            ? "Add Task"
            : "Thêm công việc"}
        </button>

        {showForm && (
          <div className={`add-task-popup ${fadeClass}`}>
            <AddTaskForm
              onAdd={(content, startDate, endDate) => {
                onAddTask(content, startDate, endDate);
                handleCloseForm();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
