import React from 'react';

const TodoList = ({ todos }) => {
    if (!todos || todos.length === 0) return null;

    return (
        <div className="todo-list-container">
            <h2>Your Action Plan</h2>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    <li key={index} className="todo-item">
                        <label className="checkbox-container">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            <span className="todo-text">{todo}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
