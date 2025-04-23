import React, { useState, useEffect, useRef } from "react";
import "../styles/AddTaskForm.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLanguage } from "../context/LanguageContext";

const AddTaskForm = ({ onAdd }) => {
  const { lang } = useLanguage();
  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setError("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError(
        lang === "en"
          ? "Please select both start and end dates."
          : "Vui lòng chọn ngày bắt đầu và kết thúc."
      );
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError(
        lang === "en"
          ? "Start date must be before end date."
          : "Ngày bắt đầu phải trước ngày kết thúc."
      );
      return;
    }

    if (input.trim()) {
      onAdd(input, startDate, endDate);
      setInput("");
      setStartDate("");
      setEndDate("");
      setError("");
    }
  };

  return (
    <div ref={wrapperRef}>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={lang === "en" ? "New task..." : "Công việc mới..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="date-range-container">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`date-input ${error ? "error" : ""}`}
          />
          <span style={{ margin: "0 4px" }}>→</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`date-input ${error ? "error" : ""}`}
          />
        </div>

        {error && <div className="error-popup">{error}</div>}
        <button type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
