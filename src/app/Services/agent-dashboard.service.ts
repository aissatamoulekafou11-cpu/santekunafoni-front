import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getPatients() {
    return this.http.get<any[]>(this.patientUrl);
  }

  getDerniersPatients() {
    return this.http.get<any[]>(`${this.patientUrl}/derniers`);
  }

  getNombreHommes() {
    return this.http.get<number>(`${this.patientUrl}/hommes`);
  }

  getNombreFemmes() {
    return this.http.get<number>(`${this.patientUrl}/femmes`);
  }

  getMaladies() {
    return this.http.get<any[]>(this.maladieUrl);
  }

  getSymptomes() {
    return this.http.get<any[]>(this.symptomeUrl);
  }

  getTraitements() {
    return this.http.get<any[]>(this.traitementUrl);
  }

  getTopSymptomes() {
    return this.http.get<any[]>(`${this.patientSymptomeUrl}/top`);
  }

}