import React, { useState } from 'react';
import '../styles/AddTaskForm.css'
const AddTaskForm = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;
