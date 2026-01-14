
export class Fournisseur {
    fournisseurID: number; 
    name: string;
    adresse: string;
    email: string;
    numeroTel: string;
  
    constructor(
      fournisseurID: number,
      name: string,
      adresse: string,
      email: string,
      numeroTel: string,
   
    ) {
      this.fournisseurID = fournisseurID;
      this.name = name;
      this.adresse = adresse;
      this.email = email;
      this.numeroTel = numeroTel;
    }
  }