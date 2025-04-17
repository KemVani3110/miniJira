import React from "react";
import TaskCard from "./TaskCard";
import AddTaskForm from "./AddTaskForm";
import { Droppable } from "@hello-pangea/dnd";
import "../styles/Column.css";

const Column = ({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
  columnId,
  showAddForm,
}) => {
  return (
    <div className="column">
      <h2>
        <i className="fa-solid fa-list-check" style={{ marginRight: 6 }}></i>
        {title} <span className="task-count">({tasks.length} task)</span>
      </h2>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="task-list"
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
