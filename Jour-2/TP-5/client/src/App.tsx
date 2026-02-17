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
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
        setErrorMessage('');
      } catch (error) {
        console.error('Erreur lors du chargement des tâches :', error);
        setErrorMessage('Serveur indisponible — impossible de charger les tâches.');
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
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la création de la tâche :', error);
      setErrorMessage('Impossible d\'ajouter la tâche — vérifiez la connexion au serveur.');
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      const updatedTask = await toggleTask(id);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche :', error);
      setErrorMessage('Impossible de mettre à jour la tâche — serveur indisponible.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      setErrorMessage('');
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche :', error);
      setErrorMessage('Impossible de supprimer la tâche — vérifiez la connexion au serveur.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        {errorMessage && (
          <div className="error-banner" role="alert" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffe6e6', color: '#900', padding: '8px 12px', borderRadius: 4, marginBottom: 12}}>
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage('')} aria-label="Fermer l'erreur" style={{background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold', color:'red'}}>✕</button>
          </div>
        )}

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
                    {task.isDone ? '✓ Fait' : '○ à Faire'}
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