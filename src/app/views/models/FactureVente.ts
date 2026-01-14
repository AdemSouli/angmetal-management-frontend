import { Client } from './Client';
import { Product } from './Product';
import { StatusFacture } from './enums/StatusFacture'; // Enum for StatusFacture

export class FactureVente {
  factureID: number;
  dateEmission: Date;
  dateEcheance: Date;
  montantTotal: number;
  statut: StatusFacture;
  client: Client; // Represents the Client object associated with the invoice
  products: Product[]; // Array of products associated with the invoice

  constructor(
    factureID: number,
    dateEmission: Date,
    dateEcheance: Date,
    montantTotal: number,
    statut: StatusFacture,
    client: Client,
    products: Product[] = []
  ) {
    this.factureID = factureID;
    this.dateEmission = dateEmission;
    this.dateEcheance = dateEcheance;
    this.montantTotal = montantTotal;
    this.statut = statut;
    this.client = client;
    this.products = products;
  }
}
