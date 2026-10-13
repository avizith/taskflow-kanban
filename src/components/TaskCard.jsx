import React from 'react';

export default function TaskCard({ task, onMoveTask, onDeleteTask }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  return (
    <div 
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="card-top">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
        <button 
          onClick={() => onDeleteTask(task.id)} 
          className="delete-btn"
          title="Slet opgave"
        >
          ✕
        </button>
      </div>

      <h4 className="card-title">{task.title}</h4>
      <p className="card-desc">{task.description}</p>

      <div className="card-actions">
        {task.status !== 'todo' && (
          <button 
            onClick={() => onMoveTask(task.id, task.status === 'done' ? 'in-progress' : 'todo')}
            className="btn-action"
          >
            ← Flyt
          </button>
        )}
        {task.status !== 'done' && (
          <button 
            onClick={() => onMoveTask(task.id, task.status === 'todo' ? 'in-progress' : 'done')}
            className="btn-action btn-next"
          >
            Flyt →
          </button>
        )}
      </div>
    </div>
  );
}