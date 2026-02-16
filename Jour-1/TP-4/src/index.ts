import { Playlist } from "./models/playlist";
import { rechercherTitres } from "./services/musicAPI";
import { StyleMusical } from "./models/types";

async function main() {
    const maPlaylist = new Playlist("Mes Favoris 2025");
    try {
        console.log("Titre joué aléatoirement :", maPlaylist.jouerAleatoire());
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Erreur lors de la lecture aléatoire :", message);
    }
    try {
        console.log("Titre a l'index 10 :", maPlaylist.obtenirTitreParIndex(10));
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Erreur lors de la lecture d'un titre par index :", message);
    }
     try {
        const resultats = await rechercherTitres("Da");
        resultats.forEach(chanson => maPlaylist.ajouter(chanson));
        console.log("Playlist mise à jour !");
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
    try {
        const resultats = await rechercherTitres("Daft Punk");
        resultats.forEach(chanson => maPlaylist.ajouter(chanson));
        console.log("Playlist mise à jour !");
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
    try {
        const resultats = await rechercherTitres("Queen");
        resultats.forEach(chanson => maPlaylist.ajouter(chanson));
        console.log("Playlist mise à jour !");
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
    try {
        const resultats = await rechercherTitres("");
        resultats.forEach(chanson => maPlaylist.ajouter(chanson));
        console.log("Playlist mise à jour !");
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
    try {
        const resultats = await rechercherTitres("jabababa");
        resultats.forEach(chanson => maPlaylist.ajouter(chanson));
        console.log("Playlist mise à jour !");
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }

    console.log("Durée totale de la playlist :", maPlaylist.obtenirDureeTotaleFormatLisible());
    console.log("Durée totale de la playlist :", maPlaylist.obtenirDureeTotale(), "secondes");
    try {
        console.log("Titre joué aléatoirement :", maPlaylist.jouerAleatoire());
    } catch (error) {
        console.error("Erreur lors de la lecture aléatoire :", error);
    }
    console.log("Chansons de style ROCK :", maPlaylist.obtenirTitresParStyle(StyleMusical.ROCK));
    console.log("Chansons de style ELECTRO :", maPlaylist.obtenirTitresParStyle(StyleMusical.ELECTRO));
    console.log("Nombre de titres dans la playlist :", maPlaylist.obtenirNombreDeTitres());
    console.log("Tous les titres de la playlist :", maPlaylist.obtenirTitres());
}



main();
