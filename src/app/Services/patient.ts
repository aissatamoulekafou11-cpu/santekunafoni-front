import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private http = inject(HttpClient);                        // l'outil d'appels réseau
  private apiUrl = 'http://localhost:8080/api/patients';    // les URLs de TON controller

  /** GET /api/patients : toute la liste depuis MySQL */
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  /** GET /api/patients/{id} */
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  /** POST /api/patients : le back attend un PatientDTO
      (pas d'id ni de role : il force Role.PATIENT lui-même) */
  addPatient(patient: Omit<Patient, 'idUtilisateur'>): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, this.preparerEnvoi(patient));
  }

  /** PUT /api/patients/{id} : le back attend l'entité complète */
  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(
      `${this.apiUrl}/${patient.idUtilisateur}`,
      this.preparerEnvoi(patient)
    );
  }

  /** DELETE /api/patients/{id} */
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Prépare l'objet avant envoi au back.
   * `periode` est un java.util.Date côté Java : il veut un format ISO COMPLET.
   * Notre input datetime-local produit "2026-07-01T08:00" (incomplet)
   * → on le convertit en "2026-07-01T08:00:00.000Z".
   */
  private preparerEnvoi(patient: any): any {
    return {
      ...patient,
      periode: patient.periode ? new Date(patient.periode).toISOString() : null
    };
  }
}