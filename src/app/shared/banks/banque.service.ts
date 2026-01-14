import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Update with your environment file path
import { Banque } from '../../views/models/Banque';

@Injectable({
  providedIn: 'root'
})

export class BanqueService {
  private apiUrl = environment.apiUrl + '/banques'

  constructor(private http: HttpClient) { }

  getBanques(): Observable<Banque[]> {
    return this.http.get<Banque[]>(this.apiUrl);
  }

  addBanque(banque: Banque): Observable<Banque> {
    return this.http.post<Banque>(this.apiUrl, banque);
  }

  updateBanque(banque: Banque): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${banque.compteID}`, banque);
  }

  deleteBanque(compteID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${compteID}`);
  }
}
