import React from "react";
import "./styles/App.css";
import Column from "./components/Column";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "@hello-pangea/dnd";

const App = () => {
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", {
    todo: [],
    inprogress: [],
    done: [],
  });

  const addTask = (columnId, content) => {
    const newTask = { id: uuidv4(), content };
    setTasks({
      ...tasks,
      [columnId]: [...tasks[columnId], newTask],
    });
  };

  const deleteTask = (columnId, taskId) => {
    const newColumn = tasks[columnId].filter((task) => task.id !== taskId);
    setTasks({
      ...tasks,
      [columnId]: newColumn,
    });
  };

  const editTask = (columnId, taskId, newContent) => {
    const updatedTasks = tasks[columnId].map((task) =>
      task.id === taskId ? { ...task, content: newContent } : task
    );
    setTasks({
      ...tasks,
      [columnId]: updatedTasks,
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceTasks = Array.from(tasks[source.droppableId]);
    const [movedTask] = sourceTasks.splice(source.index, 1);
    const destTasks = Array.from(tasks[destination.droppableId]);
    destTasks.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceTasks,
      [destination.droppableId]: destTasks,
    });
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          <Column
            columnId="todo"
            title="To Do"
            tasks={tasks.todo}
            onAddTask={(content) => addTask("todo", content)}
            onDeleteTask={(taskId) => deleteTask("todo", taskId)}
            onEditTask={(taskId, newContent) =>
              editTask("todo", taskId, newContent)
            }
            showAddForm={true}
          />

          <Column
            columnId="inprogress"
            title="In Progress"
            tasks={tasks.inprogress}
            onAddTask={() => {}}
            onDeleteTask={(taskId) => deleteTask("inprogress", taskId)}
            onEditTask={(taskId, newContent) =>
              editTask("inprogress", taskId, newContent)
            }
            showAddForm={false}
          />

          <Column
            columnId="done"
            title="Done"
            tasks={tasks.done}
            onAddTask={() => {}}
            onDeleteTask={(taskId) => deleteTask("done", taskId)}
            onEditTask={(taskId, newContent) =>
              editTask("done", taskId, newContent)
            }
            showAddForm={false}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
