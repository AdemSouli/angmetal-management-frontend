import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { RegisterRequest } from '../models/register-request.interface';
import { RegisterResponse } from '../models/register-response.interface';

import { LoginRequest } from '../models/login-request.interface';
import { LoginResponse } from '../models/login-response.interface';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  private logger = new Subject<boolean>();

  isAuthenticated(): boolean {
    let token: string | null = sessionStorage.getItem('accessToken')
    if (token) {
      return !this.jwtHelper.isTokenExpired(token!);
    }
    return false;
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.logger.asObservable()
  }

  register(signupRequestPayload: RegisterRequest): Observable<RegisterResponse> {
    return this.httpClient.post<RegisterResponse>(environment.apiUrl + "/auth/register", signupRequestPayload).pipe(
      map(response => {
        return response
      })
    )
  }

  login(loginRequestPayload: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(environment.apiUrl + "/auth/login", loginRequestPayload).pipe(
      map(response => {
        if (response.statusCode === 200) {
          console.log('Login successful, response:', response);
  
          // Check if response contains the token
          if (response.data?.token) {
            sessionStorage.setItem('accessToken', response.data?.token.toString());
  
            // Store only the essential user info if available
            if (response.data?.user) {
              sessionStorage.setItem('id', response.data.user.id?.toString() || '');
              sessionStorage.setItem('username', response.data.user.username || '');
              sessionStorage.setItem('email', response.data.user.email || '');
              sessionStorage.setItem('phone', response.data.user.phone || ''); // Store phone
              sessionStorage.setItem('address', response.data.user.address || ''); // Store address
  
              // Store the user's roles
              sessionStorage.setItem('roles', JSON.stringify(response.data.user.roles || [])); // Store roles as a JSON string
            }
          }
  
          // Notify logger (assuming this triggers some side effect)
          this.logger.next(true);
        }
        return response;
      })
    );
  }
  
  
  logout(): boolean {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('address');
    sessionStorage.removeItem('phone');
    this.logger.next(false);
    this.router.navigateByUrl("/login");
    return true;
  }
}