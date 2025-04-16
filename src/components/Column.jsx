import React from 'react';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import { Droppable } from '@hello-pangea/dnd';
import '../styles/Column.css';

const Column = ({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  columnId,
  showAddForm,
}) => {
  return (
    <div className="column">
      <h2>{title}</h2>
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
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {showAddForm && <AddTaskForm onAdd={onAddTask} />}
    </div>
  );
};

export default Column;
