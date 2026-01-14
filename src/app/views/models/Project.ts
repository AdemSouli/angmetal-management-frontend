import  { StatutProjet } from './enums/StatusProject'

export class Project {
    projetID: string;
    nomProjet: string;
    dateDebut: Date;
    dateFin: Date;
    statut: StatutProjet;
    client: any;  
    company: any; 
  
    constructor(projetID: string, nomProjet: string, dateDebut: Date, dateFin: Date, statut:StatutProjet,client:any,company:any ) {
      this.projetID = projetID;
      this.nomProjet = nomProjet;
      this.dateDebut = dateDebut;
      this.dateFin = dateFin;
      this.statut = statut;
      this.client = client;
      this.company=company;
    }
  }
  
