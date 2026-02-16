import { IChanson, StyleMusical } from "../models/types";

export function rechercherTitres(requete: string): Promise<IChanson[]> {
    return new Promise((resolve, reject) => {
        console.log("Recherche en cours sur le serveur de " + requete.trim() + "...");
        setTimeout(() => {
            if (requete.trim() === "") {
                const error = new Error("Recherche vide interdite");
                reject(error.message);
            }
            if(requete.trim().length <= 3){
                const error = new Error("La requête doit contenir au moins 3 caractères");
                reject(error.message);
            }
            const chansons: IChanson[] = [
                {
                    titre: "Bohemian Rhapsody",
                    artiste: "Queen",
                    duree: 354,
                    style: StyleMusical.ROCK
                },
                {
                    titre: "Shape of You",
                    artiste: "Ed Sheeran",
                    duree: 233,
                    style: StyleMusical.POP
                },
                {
                    titre: "Blinding Lights",
                    artiste: "The Weeknd",
                    duree: 203,
                    style: StyleMusical.ELECTRO
                },
                {
                    titre: "Harder, Better, Faster, Stronger",
                    artiste: "Daft Punk",
                    duree: 224,
                    style: StyleMusical.ELECTRO
                },
                {
                    titre: "Sicko Mode",
                    artiste: "Travis Scott",
                    duree: 312,
                    style: StyleMusical.HIPHOP
                }
            ];
            
            const resultats = chansons.filter(chanson =>
                chanson.titre.toLowerCase().includes(requete.toLowerCase()) ||
                chanson.artiste.toLowerCase().includes(requete.toLowerCase())
            );
            if(resultats.length === 0) {
                const error = new Error("Aucun résultat trouvé pour la requête : " + requete);
                reject(error.message);
            }
            resolve(resultats);
        }, 2000);
    });
}