import React, { useState } from "react";

interface InputProps {
  addTodo: (title: string) => Promise<void>;
}

const Input: React.FC<InputProps> = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  return (
    <div>
      <div className="row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="row">
        <button onClick={() => setTitle("Example 1")}>Show Done</button>
        <button onClick={() => setTitle("Example 2")}>Show Undone</button>
        <button onClick={() => setTitle("Example 3")}>Show All</button>
      </div>
    </div>
  );
};

export default Input;
