// Créez 4 fonctions async qui utilisent fetch pour dialoguer avec votre serveur :
// ● getAllTasks()
// ● createTask(label)
// ● toggleTask(id)
// ● deleteTask(id)

const API_URL = '/api/tasks';

export const getAllTasks = async () => {
    const response = await fetch(API_URL); 
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tâches');
    }
    return await response.json();
};

export const createTask = async (label: string) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label })
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la création de la tâche');
    }
    return await response.json();
};

export const toggleTask = async (id: number) => {
    const response = await fetch(`${API_URL}/update/${id}`, {
        method: 'PUT'
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la tâche');
    }
    return await response.json();
};

export const deleteTask = async (id: number) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la tâche');
    }
    return await response.json();
}