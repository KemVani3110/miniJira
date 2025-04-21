/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useState } from "react";
import "./styles/App.css";
import Column from "./components/Column";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "@hello-pangea/dnd";
import ThemeToggle from "./components/ThemeToggle";
//import LanguageToggle from "./components/LanguageToggle";
import { useLanguage } from "./context/LanguageContext";

const App = () => {
  const { lang } = useLanguage();

  const [columns, setColumns] = useLocalStorage("kanban-columns", [
    {
      id: "todo",
      title: lang === "en" ? "To Do" : "Cần làm",
      showAddForm: true,
    },
    {
      id: "inprogress",
      title: lang === "en" ? "In Progress" : "Đang làm",
      showAddForm: false,
    },
    {
      id: "done",
      title: lang === "en" ? "Done" : "Hoàn thành",
      showAddForm: false,
    },
  ]);

  const [tasks, setTasks] = useLocalStorage("kanban-tasks", {
    todo: [],
    inprogress: [],
    done: [],
  });

  const addColumn = () => {
    const newId = uuidv4();
    const newColumn = {
      id: newId,
      title: lang === "en" ? "New Column" : "Cột mới",
      showAddForm: false,
    };
    setColumns((prev) => [...prev, newColumn]);
    setTasks((prev) => ({ ...prev, [newId]: [] }));
  };

  const editColumnTitle = useCallback((columnId, newTitle) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );
  }, []);

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

  const deleteColumn = useCallback((columnId) => {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
    setTasks((prev) => {
      const updated = { ...prev };
      delete updated[columnId];
      return updated;
    });
  }, []);

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

  return (
    <div className="app">
      <div className="top-bar">
        <ThemeToggle />
        {/* <LanguageToggle /> */}
        <h1>Kanban Board</h1>
      </div>
   
      <div className="btn-holder">
        <button className="add-column-btn" onClick={addColumn}>
          <i className="fa-solid fa-plus"></i>{" "}
          {lang === "en" ? "Add Column" : "Thêm cột"}
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map(({ id, title, showAddForm }) => (
            <Column
              key={id}
              columnId={id}
              title={title}
              tasks={tasks[id] || []}
              onAddTask={(content, date, priority) =>
                addTask(id, content, date, priority)
              }
              onDeleteTask={(taskId) => deleteTask(id, taskId)}
              onEditTask={(taskId, content) => editTask(id, taskId, content)}
              onEditColumnTitle={(newTitle) => editColumnTitle(id, newTitle)}
              onDeleteColumn={() => deleteColumn(id)}
              showAddForm={showAddForm}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
