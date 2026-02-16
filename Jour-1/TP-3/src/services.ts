import { Utilisateur } from "./types";

export const mockUsers: Utilisateur[] = [
{ id: 1, nom: "Alice", email: "alice@test.com" },
{ id: 2, nom: "Bob", email: "bob@test.com" },
{ id: 3, nom: "Charlie", email: "charlie@test.com" },
];

export function fetchUtilisateurs(): Promise<Utilisateur[]> {
return new Promise((resolve, reject) => { // Notez l'ajout de 'reject'
setTimeout(() => {
const success = Math.random() > 0.5; // 1 chance sur 2
if (success) {
resolve(mockUsers);
} else {
reject("Erreur lors de la récupération des utilisateurs");
}
}, 1000);
});
}
