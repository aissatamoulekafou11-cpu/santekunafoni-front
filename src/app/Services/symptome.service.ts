import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Symptome } from '../Models/symptome.model';

@Injectable({
  providedIn: 'root'
})
export class SymptomeService {

  // Injection du client HTTP
  private http = inject(HttpClient);

  // URL de l'API Spring Boot
  private apiUrl = 'http://localhost:8080/api/symptomes';

  constructor() { }

  // Ajouter un symptôme
  addSymptome(symptome: Symptome): Observable<any> {
    return this.http.post(`${this.apiUrl}`, symptome);
  }

  // Récupérer tous les symptômes
  getAllSymptomes(): Observable<Symptome[]> {
    return this.http.get<Symptome[]>(this.apiUrl);
  }

  // Récupérer un symptôme par son ID
  getSymptomeById(id: number): Observable<Symptome> {
    return this.http.get<Symptome>(`${this.apiUrl}/${id}`);
  }

  // Modifier un symptôme
  updateSymptome(id: number, symptome: Symptome): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, symptome);
  }

  // Supprimer un symptôme
  deleteSymptome(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}