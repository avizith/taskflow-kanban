import React, { useState } from 'react';
import TaskCard from './TaskCard';

export default function Column({ title, status, tasks, onMoveTask, onDeleteTask }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const filteredTasks = tasks.filter(task => task.status === status);

  const handleDragOver = (e) => {
    e.preventDefault(); // Nødvendigt for at tillade drop
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onMoveTask(taskId, status);
    }
  };

  return (
    <div 
      className={`column ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3 className="column-title">{title}</h3>
        <span className="task-count">{filteredTasks.length}</span>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p style={{ color: '#6b7280', fontSize: '0.88rem', textAlign: 'center', marginTop: '3rem' }}>
            Ingen opgaver endnu
          </p>
        ) : (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onMoveTask={onMoveTask} 
              onDeleteTask={onDeleteTask} 
            />
          ))
        )}
      </div>
    </div>
  );
}