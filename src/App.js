import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import './styles/App.css';

function App() {
    const [leftTodos, setLeftTodos] = useState(() => {
        const savedLeftTodos = localStorage.getItem('leftTodos');
        return savedLeftTodos ? JSON.parse(savedLeftTodos) : [];
    });

    const [rightTodos, setRightTodos] = useState(() => {
        const savedRightTodos = localStorage.getItem('rightTodos');
        return savedRightTodos ? JSON.parse(savedRightTodos) : [];
    });

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('leftTodos', JSON.stringify(leftTodos));
    }, [leftTodos]);

    useEffect(() => {
        localStorage.setItem('rightTodos', JSON.stringify(rightTodos));
    }, [rightTodos]);

    const handleAddTodo = (setTodos, todos) => (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), title: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const handleDeleteTodo = (setTodos, todos, id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleToggleComplete = (setTodos, todos, id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="App">
            <h1>ToDo List</h1>
            <div className="header-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new todo"
                />
                <div className="buttons">
                    <button className="add-button" onClick={handleAddTodo(setLeftTodos, leftTodos)}> + Assign to Xiaoyu</button>
                    <button className="add-button" onClick={handleAddTodo(setRightTodos, rightTodos)}> + Assign to Yun</button>
                </div>
            </div>

            <div className="cards">
                <div className="card">
                    <h2>Xiaoyu</h2>
                    <ul>
                        {leftTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                title={todo.title}
                                completed={todo.completed}
                                onToggle={() => handleToggleComplete(setLeftTodos, leftTodos, todo.id)}
                                onRemove={() => handleDeleteTodo(setLeftTodos, leftTodos, todo.id)}
                            />
                        ))}
                    </ul>
                </div>
                <div className="card">
                    <h2>Yun</h2>
                    <ul>
                        {rightTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                title={todo.title}
                                completed={todo.completed}
                                onToggle={() => handleToggleComplete(setRightTodos, rightTodos, todo.id)}
                                onRemove={() => handleDeleteTodo(setRightTodos, rightTodos, todo.id)}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;