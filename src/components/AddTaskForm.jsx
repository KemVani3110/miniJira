import React, { useState } from "react";
import "../styles/AddTaskForm.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const priorities = [
  { value: "low", label: "Low", icon: "fa-circle", color: "green" },
  {
    value: "medium",
    label: "Medium",
    icon: "fa-exclamation-circle",
    color: "orange",
  },
  {
    value: "high",
    label: "High",
    icon: "fa-exclamation-triangle",
    color: "red",
  },
];

const AddTaskForm = ({ onAdd }) => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      setError("Please select a valid date.");
      return;
    }

    if (input.trim()) {
      onAdd(input, date, priority);
      setInput("");
      setDate("");
      setPriority("medium");
      setError("");
    }
  };

  const selectedPriority = priorities.find((p) => p.value === priority);

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="date-input-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`date-input ${error ? "error" : ""}`}
        />
        {error && <div className="error-popup">{error}</div>}
      </div>

      <div className="priority-dropdown">
        <div
          className="priority-selected"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <i
            className={`fa-solid ${selectedPriority.icon}`}
            style={{ color: selectedPriority.color }}
          ></i>
          <span>{selectedPriority.label}</span>
          <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
        </div>
        {showDropdown && (
          <div className="priority-options">
            {priorities.map((p) => (
              <div
                key={p.value}
                className="priority-option"
                onClick={() => {
                  setPriority(p.value);
                  setShowDropdown(false);
                }}
              >
                <i
                  className={`fa-solid ${p.icon}`}
                  style={{ color: p.color }}
                ></i>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};

export default AddTaskForm;
