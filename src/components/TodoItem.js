import React from 'react';

function TodoItem({ title, completed, onToggle, onRemove }) {
    return (
        <li className="todo-item">
            <span
                style={{ textDecoration: completed ? 'line-through' : 'none' }}
                onClick={onToggle}
            >
                {title}
            </span>
            <button className="remove-button" onClick={onRemove}>X</button>
        </li>
    );
}

export default TodoItem;