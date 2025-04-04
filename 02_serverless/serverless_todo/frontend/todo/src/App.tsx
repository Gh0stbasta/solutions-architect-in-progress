import { useState, useEffect } from "react"; // import usestate to handle state and useffect to handle side effects like fetching on load
import { v4 as uuidv4 } from "uuid"; // needed to create an unique id for every task
import { Todo } from "./types"; // created a special type of todo, to set the variables to specific datatypes

const App = () => {
  // main app, that gets rendered on the site
  const [todos, setTodos] = useState<Todo[]>([]); // creating a list, that has to contain objects of the type Todo that we imported earlier
  const [newTodo, setNewTodo] = useState<string>(""); // if a todo gets entered via the input on the website we fist save it as a string
  const [filter, setFilter] = useState<"all" | "active" | "done">("all"); // this is a state with 3 options to filter the tasks in the db

  const API = import.meta.env.VITE_API_URL; // importing environment variable to hide it in public. This points to our api gateway

  // Fetch data from DynamoDB via API Gateway
  useEffect(() => {
    // starts a sideeffect on load of the site, since it has no dependancys in line 25
    const fetchTodos = async () => {
      // doing a simple fetch. Since we're doing it async, await style we dont land in callback hell
      try {
        // simple error handling for clean code
        const response = await fetch(`${API}/todos`); // we wait for the response from the api and load it into response variable
        const data = await response.json(); // then we wait for the data variable to get filled with json data from the api response
        setTodos(data); // now we can put our data (objects in the form of todos from our DynamoDb Database) into our todo-List
        console.log(data); // showing it in the console so we can see what we are working on
      } catch (error) {
        // if an error occurs send a message
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos(); // run the function
  }, []);

  // Add todo function
  const addTodo = async () => {
    // declaring a function to add a todo to our list and to the database
    if (!newTodo.trim()) return; // if theres nothin in there, we just return

    const todo: Todo = {
      // otherwise we declare a todo-Object with the values
      id: uuidv4(),
      title: newTodo,
      done: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch(`${API}/todo`, {
        // here were pushing the values over our api to DynamoDB
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      setTodos([...todos, todo]); // and then bringing our own list up to date
      setNewTodo(""); // clearing the input again
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete todo function
  const deleteTodo = async (id: string) => {
    // declaring a function to delete a todo from database and screen
    try {
      await fetch(`${API}/todo/${id}`, {
        // deleting it from DynamoDB via the Fetch
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setTodos(todos.filter((todo) => todo.id !== id)); // updating our own todolist with a new list that contains all elements except the one with the id we just deleted
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Mark todo as done
  const toggleDone = async (id: string) => {
    // declaring a function to toggle the status of the task to done: falsse || true
    const todo = todos.find((t) => t.id === id); // first we have to find the todo with our specified id with the find function that takes a callback
    if (!todo) return; // no todo means no work

    const updatedTodo = { ...todo, done: !todo.done }; // else we update the done attribute of our object

    try {
      await fetch(`${API}/todo/patch/${id}`, {
        // and then push it to our DynamoDB via fetch
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))); // maping over our todos list and updating the done parameter of the object thats matching our id
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    // here we are filtering on the done attribute of our todo objects
    if (filter === "active") return !todo.done; // if filter is active only return false values
    if (filter === "done") return todo.done; // if filter is done only return true values
    return true; // if filter is all return everything
  });

  return (
    // here we need our enclosing div to only render one element to the screen
    <div>
      <h1>Todo App</h1>
      <div className="input-form">
        <input
          type="text"
          // here we set the value of the input field to the state ov newTodo
          value={newTodo}
          // if the users types in a todo our value update from the line above gets updated
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        {/* fire the function addtodo when button is clickec */}
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="filter-row">
        {/* pretty neat to use an anonymous function directly in the button */}
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("done")}>Done</button>
      </div>
      <ul>
        {/* we always get filtered todos and map over them. iterating over the list */}
        {filteredTodos.map((todo) => (
          // every list item needs a unique id in react, perfect with uuid
          <li key={todo.id}>
            <span
            // styling it the task is done
              style={{
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {/* inserting the actual title of the todo here */}
              {todo.title}
            </span>
            {/* done button */}
            <button onClick={() => toggleDone(todo.id)}>
              {/* pretty neat ternary operator to show button text done or undo */}
              {todo.done ? "Undo" : "Done"}
            </button>
            {/* fire delete todo if button is clicked */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
