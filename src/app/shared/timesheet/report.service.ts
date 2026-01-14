import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Update with the path to your environment configuration

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = `${environment.apiUrl}/reports`;  // Replace with your backend API endpoint for reports

  constructor(private http: HttpClient) {}

  // Fetch a list of reports
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a single report by ID
  getReportById(rapportID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${rapportID}`);
  }

  // Generate a new report (POST request)
  createReport(reportData: any): Observable<any> {
    return this.http.post(this.apiUrl, reportData);
  }

  // Update an existing report
  updateReport(rapportID: number, reportData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rapportID}`, reportData);
  }

  // Delete a report
  deleteReport(rapportID: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${rapportID}`);
  }
}
