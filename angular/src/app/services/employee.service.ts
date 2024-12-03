import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8081/api/employees'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer un employé par ID avec authentification basique
  getEmployeeById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW46YjQ1OTRlOWEtMjY0OC00N2IwLWE3ZmItODRiNDVhZmFlNmY2' // Remplacez par vos credentials encodés
    });

    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour récupérer tous les employés
  getAllEmployees(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW46YjQ1OTRlOWEtMjY0OC00N2IwLWE3ZmItODRiNDVhZmFlNmY2' // Remplacez par vos credentials encodés
    });

    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }
}