import React, { useState, useEffect } from 'react';
import Column from './components/Column';
import TaskModal from './components/TaskModal';
import { initialTasks } from './utils/initialData';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleMoveTask = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleResetData = () => {
    setTasks(initialTasks);
    localStorage.setItem('kanban-tasks', JSON.stringify(initialTasks));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1 className="header-title">TaskFlow Agile Board</h1>
          <p className="header-subtitle">Streamline sprint tasks, track progress, and organize team workflow seamlessly.</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={handleResetData}
            className="btn-reset"
            title="Reset board to initial professional tasks"
          >
            Reset Titles
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-add-task"
          >
            + Create Task
          </button>
        </div>
      </header>

      <main className="board-grid">
        <Column 
          title="To Do" 
          status="todo" 
          tasks={tasks} 
          onMoveTask={handleMoveTask} 
          onDeleteTask={handleDeleteTask} 
        />
        <Column 
          title="In Progress" 
          status="in-progress" 
          tasks={tasks} 
          onMoveTask={handleMoveTask} 
          onDeleteTask={handleDeleteTask} 
        />
        <Column 
          title="Completed" 
          status="done" 
          tasks={tasks} 
          onMoveTask={handleMoveTask} 
          onDeleteTask={handleDeleteTask} 
        />
      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddTask={handleAddTask} 
      />
    </div>
  );
}