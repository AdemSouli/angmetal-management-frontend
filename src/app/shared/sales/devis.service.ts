import { Injectable } from '@angular/core';
import { Devis } from '../../views/models/Devis';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private baseUrl = environment.apiUrl+'/devis'; 

  constructor(private http: HttpClient) { }

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.baseUrl}`);
  }

  getDevisById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.baseUrl}/${id}`);
  }

  createDevis(devis: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, devis);
  }

  updateDevis(id: number, devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.baseUrl}/${id}`, devis);
  }

  deleteDevis(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}