let nom: string = "Romain";
let age: number = 34;
let estAdherent: boolean = true;
let score = 10

let sports: string[] = ["football", "tennis", "natation"];

let panier: { produit: string; prix: number }[] = [
  { produit: "Livre", prix: 15 },
  { produit: "Stylo", prix: 2 },
  { produit: "Ordinateur", prix: 900 }
];

const article = panier[2];

if (article) {
  console.log(calculerRemise(article.prix))
}


let reponseAPI: [number, string] = [200, "OK"];

function calculerRemise(prix: number): number {
  return prix * 0.8; 
}

function saluer(prenom: string, titre?: string): string {
  if (titre) {
    return `Bonjour ${titre} ${prenom}`;
  }
  return `Bonjour ${prenom}`;
}

function formaterID(id: string | number): number {
  return Number(id);
}

interface IEquipement {
  id: number;
  nom: string;
  categorie: string;
  disponible: boolean;
}

function afficherInventaire(equipements: IEquipement[]): void {
  equipements
    .filter(equipement => equipement.disponible)
    .forEach(equipement => {
      console.log(equipement.nom);
    });
}

const inventaire: IEquipement[] = [
  { id: 1, nom: "Ballon", categorie: "Football", disponible: true },
  { id: 2, nom: "Raquette", categorie: "Tennis", disponible: false },
  { id: 3, nom: "Casque", categorie: "Cyclisme", disponible: true }
];

afficherInventaire(inventaire);

