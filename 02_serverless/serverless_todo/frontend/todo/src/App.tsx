import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const API = "https://ly0wbnn0f3.execute-api.eu-central-1.amazonaws.com";

  // Fetch data from DynamoDB via API Gateway
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API}/todos`);
        const data = await response.json();
        setTodos(data);
        console.log(data);
        console.log(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  // Add todo function
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: uuidv4(),
      text: newTodo,
      done: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch(`${API}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      setTodos([...todos, todo]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete todo function
  const deleteTodo = async (id: string) => {
    try {
      await fetch(`${API}/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Mark todo as done
  const toggleDone = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, done: !todo.done };

    try {
      await fetch(`${API}/todo/patch/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleDone(todo.id)}>
              {todo.done ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
