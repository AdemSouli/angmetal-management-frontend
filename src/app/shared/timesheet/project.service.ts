import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = `${environment.apiUrl}/projects`;  // Replace with your backend URL for projects

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a project by its ID
  getProjectById(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${projectId}`);
  }

  // Create a new project (POST request)
  createProject(projectData: any): Observable<any> {
    return this.http.post(this.apiUrl, projectData);
  }

  // Update an existing project
  updateProject(projectId: string, projectData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${projectId}`, projectData);
  }

  // Delete a project
  deleteProject(projectId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${projectId}`);
  }
}
