import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Patient } from '../Models/patient.model'; 

@Injectable({
  providedIn: 'root' 
})
export class AuthService { 

  private baseUrl = 'http://localhost:8080/api/auth';
  
  // Ajout de l'URL spécifique pour l'API des patients
  private patientsUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  /**
   * 1. Inscription d'un Patient
   * CORRIGÉ : On envoie désormais la requête sur /api/patients au lieu de /api/auth/inscription
   */
  inscriptionPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsUrl, patient);
  }

  /**
   * 2. Connexion (Patient, Agent, Admin)
   * Reste sur l'URL d'authentification globale : /api/auth/connexion
   */
  connexion(tel: string, motpass: string): Observable<any> {
    const identifiants = { tel, motpass };
    
    return this.http.post<any>(`${this.baseUrl}/connexion`, identifiants).pipe(
      tap(reponse => {
        // IMPORTANT : Sauvegarde automatique du Token JWT retourné par le backend
        if (reponse && reponse.token) {
          localStorage.setItem('santekunafoni_token', reponse.token);
          
          if (reponse.role) {
            localStorage.setItem('user_role', reponse.role);
          }
        }
      })
    );
  }

  /**
   * 3. Récupérer le token stocké
   * Utile pour l'intercepteur HTTP qui va l'envoyer au backend
   */
  getToken(): string | null {
    return localStorage.getItem('santekunafoni_token');
  }

  /**
   * 4. Déconnexion
   * Supprime le token du navigateur
   */
  deconnexion(): void {
    localStorage.removeItem('santekunafoni_token');
    localStorage.removeItem('user_role');
  }

  /**
   * 5. Vérifier si un utilisateur est actuellement connecté
   */
  estConnecte(): boolean {
    return !!this.getToken(); // Renvoie true si le token existe, false sinon
  }
}