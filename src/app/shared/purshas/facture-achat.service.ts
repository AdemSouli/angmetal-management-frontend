import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurshaseInvoiceService {


  private apiUrl = environment.apiUrl;  

  constructor(private http: HttpClient) { }

  // Get all bills
  getBills(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/factures/achat");
  }

  // Create a new bill
  createBill(bill: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/factures/achat", bill);
  }


}