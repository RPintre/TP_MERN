export enum StyleMusical {
    ROCK = "ROCK",
    POP = "POP",
    ELECTRO = "ELECTRO",
    HIPHOP = "HIPHOP"
}

export interface IChanson {
    titre: string;
    artiste: string;
    duree: number;
    style: StyleMusical;
}

type dureeLisible = string;

export function convertirDureeEnFormatLisible(duree: number): dureeLisible {
    const minutes = Math.floor(duree / 60);
    const secondes = duree % 60;
    return `${minutes}m ${secondes.toString().padStart(2, '0')}s`;
}