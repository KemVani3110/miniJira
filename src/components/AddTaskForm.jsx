import React, { useState, useEffect, useRef } from "react";
import "../styles/AddTaskForm.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLanguage } from "../context/LanguageContext";

// const priorities = [
//   {
//     value: "low",
//     label_en: "Low",
//     label_vi: "Thấp",
//     icon: "fa-circle",
//     color: "green",
//   },
//   {
//     value: "medium",
//     label_en: "Medium",
//     label_vi: "Trung bình",
//     icon: "fa-exclamation-circle",
//     color: "orange",
//   },
//   {
//     value: "high",
//     label_en: "High",
//     label_vi: "Cao",
//     icon: "fa-exclamation-triangle",
//     color: "red",
//   },
// ];

const AddTaskForm = ({ onAdd }) => {
  const { lang } = useLanguage();
  const [input, setInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("medium");
  // const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setError("");
        // setShowDropdown(false);
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
      onAdd(input, startDate, endDate, priority);
      setInput("");
      setStartDate("");
      setEndDate("");
      setPriority("medium");
      setError("");
    }
  };

  // const selectedPriority = priorities.find((p) => p.value === priority);

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

        {/* <div className="priority-dropdown">
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
        </div> */}

        <button type="submit">
          <i className="fa-solid fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;