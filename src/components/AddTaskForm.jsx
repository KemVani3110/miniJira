import React, { useState } from "react";
import "../styles/AddTaskForm.css";

const AddTaskForm = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium"); // default medium

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input, date, priority);
      setInput("");
      setDate("");
      setPriority("medium");
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
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
        title="Chọn độ ưu tiên"
      >
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>
      <button type="submit">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};

export default AddTaskForm;
