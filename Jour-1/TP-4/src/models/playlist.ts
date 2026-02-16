import { IChanson, StyleMusical,convertirDureeEnFormatLisible } from "./types";

export class Playlist {
    public nom: string;
    private titres: IChanson[];
    
    constructor(nom: string) {
        this.nom = nom;
        this.titres = [];
    }

    ajouter(chanson: IChanson): void {
        this.titres.push(chanson);
    }

    retirer(index: number): void {
        if (index >= 0 && index < this.titres.length) {
            this.titres.splice(index, 1);
        }
    }
    obtenirDureeTotale(): number {
        return this.titres.reduce((total, chanson) => total + chanson.duree, 0);
    }
    obtenirDureeTotaleFormatLisible(): string {
        return convertirDureeEnFormatLisible(this.obtenirDureeTotale());
    }
    obtenirTitresParStyle(style: StyleMusical): IChanson[] {
        return this.titres.filter(chanson => chanson.style === style);
    }
    obtenirNombreDeTitres(): number {
        return this.titres.length;
    }
    obtenirTitreParIndex(index: number): IChanson | null {
        if (index >= 0 && index < this.titres.length) {
            return this.titres[index] ?? null;
        }
        throw new Error("Index invalide");
    }
    jouerAleatoire(): IChanson {
        if (this.obtenirDureeTotale() === 0) {
            throw new Error("Playlist vide");
        }
        const indexAleatoire = Math.floor(Math.random() * this.obtenirNombreDeTitres());
        return this.obtenirTitreParIndex(indexAleatoire)!;
    }
    obtenirTitres(): IChanson[] {
        return [...this.titres];
    }
}