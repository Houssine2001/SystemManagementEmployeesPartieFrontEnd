import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryEmployeeService {
  private apiUrl = 'http://localhost:8081/api/history/employee/allEmotions';

  constructor(private http: HttpClient) {}

  getAllHistoryEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
