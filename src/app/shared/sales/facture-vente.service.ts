import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient if needed
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellesInvoiceService {

  private apiUrl = environment.apiUrl 

  constructor(private http: HttpClient) { }

  // Fetch all FactureVente
  getAllFactureVentes(): Observable<any> {
    return this.http.get(this.apiUrl+'/factures/vente');
  }

  // Create a new FactureVente
  createFactureVente(factureVente: any): Observable<any> {
    return this.http.post(this.apiUrl+'/factures/vente', factureVente);
  }


}
