import { fetchUtilisateurs } from "./services";
// Une fonction qui utilise 'await' DOIT être marquée 'async'
async function main() {
try {
console.log("Tentative de connexion...");
const users = await fetchUtilisateurs();
console.log(users);
} catch (error) {
console.log("error :", error);
}
}
main();