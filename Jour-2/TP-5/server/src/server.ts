import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001; // Port 3001 pour ne pas gêner React (5173)

app.use(cors());
app.use(express.json());

interface Task {
id: number; 
label: string; 
isDone: boolean; 
}

// --- DONNÉES ---
// Simulation de base de données en mémoire
let tasks = [
{ id: 1, label: 'Laver la vaisselles', isDone: false },
{ id: 2, label: "Nettoyer le cache", isDone: false },
{ id: 3, label: "Migrer les habits", isDone: false },
{ id: 4, label: "Arroser l'api", isDone: false }
];
// --- ROUTES ---
// Route de test
app.get('/', (req, res) => {
res.send('API Library v1.0 is running...');
});
// TODO 1 : Route GET pour /api/tasks
// Cette route doit renvoyer le tableau 'tasks' au format JSON
app.get('/api/tasks', (req, res) => {
 res.json(tasks);
});
// TODO 2 : Route POST pour /api/tasks
// Cette route doit :
// 1. Récupérer le label dans le body de la requête
// 2. Créer un nouvel objet tâche avec un ID unique (ex: Date.now())
// 3. Ajouter ce livre au tableau 'tasks'
// 4. Renvoyer le livre créé avec le code HTTP 201
app.post('/api/tasks', (req, res) => {

    const {label} = req.body;
    if(!label){
        res.status(400).json({message:"Le label est obligatoire"})
    }
    const newTask:Task= {
        id : tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // ID unique
        label:label,
        isDone:false
    }
    tasks.push(newTask);
    
    res.status(201).json(newTask);

});

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    
    if (!id) {
        return res.status(400).json({message: "id obligatoire"});
    }
    
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({message: "Tâche non trouvée"});
    }
    
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    
    res.status(200).json({message: "Tâche supprimée", task: deletedTask});
});

// 3. PUT /api/tasks/:id
// ○ Trouve la tâche correspondante.
// ○ Inverse son état isDone (true devient false, et inversement).
// ○ Renvoie la tâche modifiée.
app.put('/api/tasks/update/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({message:"id obligatoire"})
    }
    const task = tasks.find(t => t.id === Number(id));
    if(!task){
        res.status(404).json({message:"Tâche non trouvée"})
    }
    task!.isDone = !task!.isDone;

    res.status(200).json(task);
});
// --- DÉMARRAGE ---
// TODO : Lancez le serveur sur le port défini
app.listen(PORT);