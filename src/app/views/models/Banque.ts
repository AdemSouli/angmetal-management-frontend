export class Banque {

  compteID: number;
  name: string;
  soldeInitial: number;
  soldeActuel: number;
  constructor(
    compteID: number,
    name: string,
    soldeInitial: number,
    soldeActuel: number,
  ) {
    this.compteID = compteID;
    this.name = name;
    this.soldeInitial = soldeInitial;
    this.soldeActuel = soldeActuel;

  }
}