import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/users/create`, user);
}
updateUser(user: any): Observable<any> {
  return this.httpClient.put<any>(`${environment.apiUrl}/users/${user.id}/update`, user);
}
  public currentUser: any = {};

  constructor(private httpClient: HttpClient) { }

  getUserDetails(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/users/${userId}`).pipe(map(response => {
      if (response.statusCode === 200) {
        this.currentUser = response.data.user;
      }
      return response
    }));
  }


  deleteUser(userId: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/users/${userId}/delete`).pipe(map(response => {
      console.log('deleted')
      if (response.statusCode === 200) {
        this.currentUser = response.data;
      }
      return response
    }));
  }

  updatePassword(userId: number, data: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/users/${userId}/change-password`, data)
  }

  updateUserDetails(userId: number, data: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/users/${userId}`, data).pipe(map((response) => {
      if (response.statusCode === 200) {
        localStorage.setItem("accessToken", response.data.accessToken)
      }
      return response;
    }))
  }

  getAllUsers(){
    return this.httpClient.get<any>(`${environment.apiUrl}/users/`)
  }
}