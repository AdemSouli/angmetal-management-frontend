import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class KpiDashboardService {
   uri = environment.apiUrl

  constructor(private http: HttpClient) { }

  getKpis(): Observable<any>{
    return this.http.get<any>(this.uri+'/kpi/kpis')
  }
  
}
