import { Fournisseur } from './Fournisseur';
import { Product } from './Product';

export class FactureAchat {
  billID: number; // Corresponds to bill_id in Java entity
  montantTotal: number;
  dateEmission: Date;
  dateEcheance: Date;
  fournisseur: Fournisseur; // Relates to the Fournisseur class
  products: Product[]; // Array of products related to the invoice

  constructor(
    billID: number,
    montantTotal: number,
    dateEmission: Date,
    dateEcheance: Date,
    fournisseur: Fournisseur,
    products: Product[] = []
    
  ) {
    this.billID = billID;
    this.montantTotal = montantTotal;
    this.dateEmission = dateEmission;
    this.dateEcheance = dateEcheance;
    this.fournisseur = fournisseur;
    this.products = products;
    this.products.push(new Product());
  }

}
