export interface Report {
    reportId: number;
    typeRapport: string;
    periodeDebut: Date | null;  
    periodeFin: Date | null;
    budget: number;
  }