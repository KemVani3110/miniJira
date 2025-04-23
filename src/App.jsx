/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo, useEffect, useState } from "react";
import "./styles/App.css";
import Column from "./components/Column";
import GuideModal from "./components/GuideModal";
import useLocalStorage from "./hooks/useLocalStorage";
// import LanguageToggle from './components/LanguageToggle'
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ThemeToggle from "./components/ThemeToggle";
import { useLanguage } from "./context/LanguageContext";

const App = () => {
  const { lang } = useLanguage();
  const [showGuide, setShowGuide] = useState(false);

  const initialColumns = useMemo(
    () => [
      {
        id: uuidv4(),
        title: lang === "en" ? "To Do" : "Cần làm",
        showAddForm: true,
      },
      {
        id: uuidv4(),
        title: lang === "en" ? "In Progress" : "Đang làm",
        showAddForm: false,
      },
      {
        id: uuidv4(),
        title: lang === "en" ? "Done" : "Hoàn thành",
        showAddForm: false,
      },
    ],
    []
  );

  const [columns, setColumns] = useLocalStorage(
    "kanban-columns",
    initialColumns
  );
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", {});

  useEffect(() => {
    setTasks((prev) => {
      const updated = { ...prev };
      columns.forEach((col) => {
        if (!updated[col.id]) {
          updated[col.id] = [];
        }
      });
      return updated;
    });
  }, [columns]);

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
    (columnId, content, startDate = "", endDate = "") => {
      const newTask = {
        id: uuidv4(),
        content,
        startDate,
        endDate,
      };
      setTasks((prev) => ({
        ...prev,
        [columnId]: [...(prev[columnId] || []), newTask],
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
      const { source, destination, type } = result;
      if (!destination) return;

      //Kéo thả cột
      if (type === "column") {
        const newColumns = Array.from(columns);
        const [moved] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, moved);
        setColumns(newColumns);
        return;
      }

      //Kéo thả task trong cột
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
    [columns, tasks]
  );

  return (
    <div className="app">
      <div className="top-bar">
        <ThemeToggle />
        {/* <LanguageToggle /> */}
        <h1>Kanban Board</h1>
      </div>
      <div className="fixed-guild-btn">
        <button className="guide-btn" onClick={() => setShowGuide(true)}>
          <i className="fa-solid fa-question-circle"></i>{" "}
          {lang === "en" ? "Help" : "Hướng dẫn"}
        </button>
        {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      </div>
      <div className="btn-holder">
        <button className="add-column-btn" onClick={addColumn}>
          <i className="fa-solid fa-plus"></i>{" "}
          {lang === "en" ? "Add Column" : "Thêm cột"}
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="board"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map(({ id, title, showAddForm }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <Column
                      columnId={id}
                      title={title}
                      tasks={tasks[id] || []}
                      onAddTask={(content, startDate, endDate) =>
                        addTask(id, content, startDate, endDate)
                      }
                      onDeleteTask={(taskId) => deleteTask(id, taskId)}
                      onEditTask={(taskId, content) =>
                        editTask(id, taskId, content)
                      }
                      onEditColumnTitle={(newTitle) =>
                        editColumnTitle(id, newTitle)
                      }
                      onDeleteColumn={() => deleteColumn(id)}
                      showAddForm={showAddForm}
                      dragHandleProps={provided.dragHandleProps}
                      draggableProps={provided.draggableProps}
                      innerRef={provided.innerRef}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
