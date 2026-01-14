import { TypeClient } from './enums/TypeClient'; 

export class Client {
  clientID: number;
  name: string;
  adresse: string;
  email: string;
  numeroTel: string;
  typeClient: TypeClient;
 

  constructor(
    clientID: number,
    name: string,
    adresse: string,
    email: string,
    numeroTel: string,
    typeClient: TypeClient,
 
  ) {
    this.clientID = clientID;
    this.name = name;
    this.adresse = adresse;
    this.email = email;
    this.numeroTel = numeroTel;
    this.typeClient = typeClient;
  
  }
}
