import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // L'adresse locale de ton backend Spring Boot
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  /**
   * Envoie les données du nouveau patient au backend
   * @param patientData Objet contenant les infos conformes au PatientDTO
   */
  inscriptionPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/patients`, patientData);
  }

  /**
   * Envoie les identifiants pour l'authentification personnalisée
   * @param credentials Objet avec le téléphone et le mot de passe
   */
  connexion(credentials: { tel: string; motpass: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/custom-auth/connexion`, credentials);
  }

  /**
   * Sauvegarde les informations de l'utilisateur connecté dans le navigateur
   */
  sauvegarderSession(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}