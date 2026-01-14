import { StatusDevis } from './enums/StatusDevis';

export interface Devis {
  devisId?: number; 
  dateCreation: string;
  dateExpiration: string; 
  montantTotal: number; 
  statut: StatusDevis;
  
  
  client: {
    clientID: number; 
    name: string; 
  };

  
  products: {
    productId: number; 
    name: string; 
    price: number; 
  }[];
}
