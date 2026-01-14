import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token from sessionStorage
    const token = sessionStorage.getItem('accessToken'); // Adjust the key if different

    // Decode token (if it includes the role) or get role from another source
    const role = token ? this.extractRoleFromToken(token) : 'guest'; 

    // Clone the request and add headers
    const modifiedReq = req.clone({
      headers: req.headers
        .set('Authorization', token ? `Bearer ${token}` : '') 
        .set('Role', role) 
    });

    // Pass the request to the next handler
    return next.handle(modifiedReq);
  }

  // Helper method to decode the role from the token (assuming it's a JWT)
  private extractRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.role || 'guest'; // Adjust based on your JWT structure
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'guest'; // Default role if decoding fails
    }
  }
}
