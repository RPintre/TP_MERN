enum StatutCommande {
  EnAttente = "En Attente",
  Expediee = "Expediée",
  Livree = "Livrée"
}

interface Commande {
  id: number;
  statut: StatutCommande;
}

function afficherEtat(commande: Commande): void {
  if (commande.statut === StatutCommande.Livree) {
    console.log("Colis reçu !");
    console.log(commande.statut);
  } else {
    console.log("En cours d'acheminement");
    console.log(commande.statut);
  }
}

const maCommande: Commande = { id: 1, statut: StatutCommande.Expediee };
const maCommande2: Commande = { id: 2, statut: StatutCommande.Livree };
const maCommande3: Commande = { id: 3, statut: StatutCommande.EnAttente };

afficherEtat(maCommande); 
afficherEtat(maCommande2); 
afficherEtat(maCommande3); 

interface Livre {
  titre: string;
  auteur: string;
}

class Bibliotheque {

  private catalogue: Livre[] = [];

  public ajouterLivre(nouveauLivre: Livre): void {
    this.catalogue.push(nouveauLivre);
  }

  public obtenirNombreLivres(): number {
    return this.catalogue.length;
  }

  public listerLivres(): Livre[] {
    return this.catalogue;
  }
}

const maBibliotheque = new Bibliotheque();

maBibliotheque.ajouterLivre({ titre: "1984", auteur: "George Orwell" });
maBibliotheque.ajouterLivre({ titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry" });

console.log(maBibliotheque.obtenirNombreLivres()); // 2
console.log(maBibliotheque.listerLivres());

class Boite<T> {
  contenu: T;

  constructor(valeur: T) {
    this.contenu = valeur;
  }

  regarder(): T {
    return this.contenu;
  }
}

const boiteAString = new Boite<string>("Bonjour");
const boiteANumber = new Boite<number>(42);


const texte: string = boiteAString.regarder(); 
const nombre: number = boiteANumber.regarder();
console.log(texte); 
console.log(nombre);



function mettreAJourLivre(livre: Livre, modifications: Partial<Livre>): Livre {
  return { ...livre, ...modifications };
}
const livreOriginal: Livre = { titre: "1984", auteur: "George Orwell" };


const livreModifie = mettreAJourLivre(livreOriginal, { titre: "Animal Farm" });

maBibliotheque.ajouterLivre(livreModifie);

console.log(maBibliotheque.listerLivres());

