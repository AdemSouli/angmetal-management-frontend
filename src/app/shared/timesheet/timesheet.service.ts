import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment'
import { Timesheet } from '../../views/models/timesheet';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  apiUrl = environment.apiUrl+'/timesheet'

  constructor(
              private http: HttpClient,
              
              ) { }

  getAllTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(this.apiUrl);
  }

  getTimesheetById(id: number): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.apiUrl}/${id}`);
  }

    createTimesheet(timesheet: any): Observable<any> {  
    return this.http.post(this.apiUrl, timesheet);
  }

  updateTimesheet(id: number, timesheet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, timesheet);
  }

  deleteTimesheet(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}