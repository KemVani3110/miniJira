import React, { useState } from "react";
import "../styles/AddTaskForm.css";

const AddTaskForm = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input, date);
      setInput("");
      setDate("");
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="date-input"
        title="Chọn ngày"
      />
      <button type="submit">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};

export default AddTaskForm;
