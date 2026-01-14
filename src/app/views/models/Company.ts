export class Company {
    id: number;               
    name: string;              
    description: string;       
    location: string;          
    projets: any[] = [];       
    users: any[] = [];        
    banque?: any;              
  
    constructor(
      id: number,
      name: string,
      description: string,
      location: string,
      projets: any[] = [],
      users: any[] = [],
      banque?: any
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.location = location;
      this.projets = projets;
      this.users = users;
      this.banque = banque;
    }
  }
  