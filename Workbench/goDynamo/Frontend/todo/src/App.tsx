import React from 'react';
import { useEffect, useState } from 'react';
import Input from './components/Input';
import Output from './components/Output';

class Todo {
    createdAt: string;
    id: string;
    done: boolean;
    title: string;

    constructor(done: boolean, title: string) {
        this.createdAt = new Date().toISOString();
        this.id = crypto.randomUUID();
        this.done = done;
        this.title = title;
    }
}

const App: React.FC = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://ly0wbnn0f3.execute-api.eu-central-1.amazonaws.com/todos');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);


    const addTodo = async (title: string) => {
        const newTodo = new Todo(false, title);
        try {
            const response = await fetch('https://ly0wbnn0f3.execute-api.eu-central-1.amazonaws.com/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            const savedTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, savedTodo]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };



    // WORK HERE
    const filteredTodos = todos.filter((todo) => !todo.done);

    return (
        <div>
            <h1>Todo App</h1>
            <Input addTodo={addTodo} />
            <Output filteredTodos={filteredTodos} />
        </div>
    );
};

export default App;