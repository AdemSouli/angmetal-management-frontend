import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../../views/models/Fournisseur'
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private apiUrl = environment.apiUrl + '/fournisseurs'; 

  constructor(private http: HttpClient) { }

  // Fetch all vendors
  getVendors(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }

  // Create a new vendor
  createVendor(vendor: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl, vendor);
  }

  // Update an existing vendor
  updateVendor(id: string, vendor: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${id}`, vendor);
  }

  // Delete a vendor
  deleteVendor(id: string): Observable<Fournisseur> {
    return this.http.delete<Fournisseur>(`${this.apiUrl}/${id}`);
  }
}
