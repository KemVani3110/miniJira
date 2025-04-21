import React, { useState, useEffect, useRef } from "react";
import "../styles/AddTaskForm.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLanguage } from "../context/LanguageContext";

const priorities = [
  {
    value: "low",
    label_en: "Low",
    label_vi: "Thấp",
    icon: "fa-circle",
    color: "green",
  },
  {
    value: "medium",
    label_en: "Medium",
    label_vi: "Trung bình",
    icon: "fa-exclamation-circle",
    color: "orange",
  },
  {
    value: "high",
    label_en: "High",
    label_vi: "Cao",
    icon: "fa-exclamation-triangle",
    color: "red",
  },
];

const AddTaskForm = ({ onAdd }) => {
  const { lang } = useLanguage();
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setError("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      setError(
        lang === "en"
          ? "Please select a valid date."
          : "Vui lòng chọn ngày hợp lệ."
      );
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
    <form className="add-task-form" onSubmit={handleSubmit} ref={formRef}>
      <input
        type="text"
        placeholder={lang === "en" ? "New task..." : "Công việc mới..."}
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
          <span>
            {lang === "en"
              ? selectedPriority.label_en
              : selectedPriority.label_vi}
          </span>
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
                <span>{lang === "en" ? p.label_en : p.label_vi}</span>
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
