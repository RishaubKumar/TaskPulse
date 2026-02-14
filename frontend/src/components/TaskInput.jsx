import React, { useState } from 'react';

const TaskInput = ({ onGenerate, isLoading }) => {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            onGenerate(task);
        }
    };

    return (
        <div className="task-input-container">
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="What do you want to accomplish today?"
                    className="task-input"
                    disabled={isLoading}
                />
                <button type="submit" className="generate-btn" disabled={isLoading || !task.trim()}>
                    {isLoading ? 'Thinking...' : 'Generate Plan'}
                </button>
            </form>
        </div>
    );
};

export default TaskInput;
