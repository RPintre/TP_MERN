// Votre application doit contenir :
// 1. Un State tasks (le tableau).
// 2. Un useEffect qui charge les tâches au démarrage.
// 3. Un Formulaire pour ajouter une tâche (met à jour le serveur PUIS l'écran).
// 4. Une Liste (.map) affichant les tâches.
// ○ Si isDone est true : le texte est barré.
// ○ Un bouton "Check/Uncheck".
// ○ Un bouton "Supprimer".
import './App.css';
import React,{ useEffect, useState } from 'react';
import { createTask, deleteTask, getAllTasks, toggleTask } from './services/api';

interface Task {
  id: number;
  label: string;
  isDone: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskLabel.trim()) return;

    try {
      const newTask = await createTask(newTaskLabel);
      setTasks([...tasks, newTask]);
      setNewTaskLabel('');
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      const updatedTask = await toggleTask(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>📝 Ma To-Do List</h1>
          <p className="subtitle">Organisez vos tâches facilement</p>
        </header>

        <form onSubmit={handleAddTask} className="form-container">
          <div className="input-group">
            <input
              type="text"
              value={newTaskLabel}
              onChange={(e) => setNewTaskLabel(e.target.value)}
              placeholder="Ajouter une nouvelle tâche..."
              className="input-task"
            />
            <button type="submit" className="btn btn-add">+ Ajouter</button>
          </div>
        </form>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>Aucune tâche pour le moment. Commencez à en ajouter ! ✨</p>
          </div>
        ) : (
          <ul className="tasks-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.isDone ? 'completed' : ''}`}>
                <div className="task-content">
                  <span className={`task-label ${task.isDone ? 'done' : ''}`}>
                    {task.label}
                  </span>
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => handleToggleTask(task.id)}
                    className={`btn btn-toggle ${task.isDone ? 'btn-uncheck' : 'btn-check'}`}
                  >
                    {task.isDone ? '✓ Fait' : '○ Faire'}
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="btn btn-delete"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;