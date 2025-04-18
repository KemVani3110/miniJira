/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from "react";
import "./styles/App.css";
import Column from "./components/Column";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "@hello-pangea/dnd";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";
import { useLanguage } from "./context/LanguageContext";

const App = () => {
  const { lang } = useLanguage();

  const [tasks, setTasks] = useLocalStorage("kanban-tasks", {
    todo: [],
    inprogress: [],
    done: [],
  });

  const addTask = useCallback(
    (columnId, content, date = "", priority = "Medium") => {
      const newTask = { id: uuidv4(), content, date, priority };
      setTasks((prev) => ({
        ...prev,
        [columnId]: [...prev[columnId], newTask],
      }));
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (columnId, taskId) => {
      setTasks((prev) => ({
        ...prev,
        [columnId]: prev[columnId].filter((task) => task.id !== taskId),
      }));
    },
    [setTasks]
  );

  const editTask = useCallback(
    (columnId, taskId, newContent) => {
      setTasks((prev) => ({
        ...prev,
        [columnId]: prev[columnId].map((task) =>
          task.id === taskId ? { ...task, content: newContent } : task
        ),
      }));
    },
    [setTasks]
  );

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      if (!destination) return;

      const sourceColumn = [...tasks[source.droppableId]];
      const destColumn = [...tasks[destination.droppableId]];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceColumn.splice(destination.index, 0, movedTask);
        setTasks((prev) => ({
          ...prev,
          [source.droppableId]: sourceColumn,
        }));
      } else {
        destColumn.splice(destination.index, 0, movedTask);
        setTasks((prev) => ({
          ...prev,
          [source.droppableId]: sourceColumn,
          [destination.droppableId]: destColumn,
        }));
      }
    },
    [tasks]
  );

  const columnList = useMemo(
    () => [
      { id: "todo", title: lang === "en" ? "To Do" : "Cần làm", showAddForm: true },
      { id: "inprogress", title: lang === "en" ? "In Progress" : "Đang làm", showAddForm: false },
      { id: "done", title: lang === "en" ? "Done" : "Hoàn thành", showAddForm: false },
    ],
    [lang]
  );

  return (
    <div className="app">
      <div className="app-header">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <h1>{lang === "en" ? "Kanban Board" : "Bảng công việc"}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columnList.map(({ id, title, showAddForm }) => (
            <Column
              key={id}
              columnId={id}
              title={title}
              tasks={tasks[id]}
              onAddTask={(content, date, priority) =>
                addTask(id, content, date, priority)
              }
              onDeleteTask={(taskId) => deleteTask(id, taskId)}
              onEditTask={(taskId, content) => editTask(id, taskId, content)}
              showAddForm={showAddForm}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
