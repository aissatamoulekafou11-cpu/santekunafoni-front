import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../Models/patient.model'; // Vérifie bien si ton dossier s'appelle Models avec un M majuscule

@Injectable({
  providedIn: 'root' // Rend le service accessible partout dans l'application
})
export class AuthService { // On l'appelle AuthService pour être propre

  // L'adresse de ton backend Spring Boot (ajuste le port 8080 si nécessaire)
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  /**
   * 1. Inscription d'un Patient
   * Envoie l'objet Patient complet (avec nom, prenom, tel, motpass, age, sexe, localite)
   */
  inscriptionPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl}/inscription`, patient);
  }

  /**
   * 2. Connexion (Pour tout le monde : Patient, Agent, Admin)
   * On envoie juste le téléphone et le mot de passe
   */
  connexion(tel: string, motpass: string): Observable<any> {
    const identifiants = { tel, motpass };
    return this.http.post<any>(`${this.baseUrl}/connexion`, identifiants);
  }
} 