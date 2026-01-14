import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client } from '../../views/models/Client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl+'/clients'; 
  
  constructor(private http: HttpClient) { }

  // Fetch all clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  // Fetch a client by ID
  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Add a new client
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  // Update an existing client
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client);
  }

  // Delete a client
  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/${id}`);
  }
  
}
