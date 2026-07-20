import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentDashboardService {
  private http = inject(HttpClient);

  private patientUrl = 'http://localhost:8080/api/patients';
  private maladieUrl = 'http://localhost:8080/api/maladies';
  private symptomeUrl = 'http://localhost:8080/api/symptomes';
  private traitementUrl = 'http://localhost:8080/api/traitements';
  private patientSymptomeUrl = 'http://localhost:8080/api/patient-symptomes';

  getNombrePatients(): Observable<number> {
    return this.http.get<number>(`${this.patientUrl}/count`);
  }

  getDerniersPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.patientUrl}/derniers`);
  }

  getNombreHommes(): Observable<number> {
    return this.http.get<number>(`${this.patientUrl}/hommes`);
  }

  getNombreFemmes(): Observable<number> {
    return this.http.get<number>(`${this.patientUrl}/femmes`);
  }

  getMaladies(): Observable<any[]> {
    return this.http.get<any[]>(this.maladieUrl);
  }

  getSymptomes(): Observable<any[]> {
    return this.http.get<any[]>(this.symptomeUrl);
  }

  getTraitements(): Observable<any[]> {
    return this.http.get<any[]>(this.traitementUrl);
  }

  getTopSymptomes(): Observable<any[]> {
    // Si l'api retourne un tableau d'objets ou de paires [nom, count]
    return this.http.get<any[]>(`${this.patientSymptomeUrl}`);
  }
}