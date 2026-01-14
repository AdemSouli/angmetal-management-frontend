import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Update with your environment path

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/products`; // Make sure this is correct
  
  constructor(private http: HttpClient) {}

  // Create a new product
  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, product);
  }

  // Get a list of all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Get a single product by its ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
