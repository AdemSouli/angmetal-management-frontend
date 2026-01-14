import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Get all companies
  getAllCompanies(): Observable<any> {
    return this.http.get<any>(`${this.url}/companies`);
  }

  // Get a specific company by ID
  getCompanyById(companyId: number): Observable<any> {
    return this.http.get(`${this.url}/companies/${companyId}`);
  }

  // Create a new company
  createCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.url}/companies`, companyData);
  }

  // Update an existing company by ID
  updateCompany(companyId: number, companyData: any): Observable<any> {
    return this.http.put(`${this.url}/companies/${companyId}`, companyData);
  }

  // Delete a company by ID
  deleteCompany(companyId: number): Observable<any> {
    return this.http.delete(`${this.url}/companies/${companyId}`);
  }
}
