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


  // ==========================================
  // AJOUTS POUR GÉRER LES RÔLES ET LA SIDEBAR
  // ==========================================

  /**
   * Récupère l'objet utilisateur stocké dans le localStorage
   */
  getUtilisateurConnecte(): any {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  /**
   * Retourne le rôle de l'utilisateur connecté (ex: 'PATIENT', 'AGENT_SANTE', 'ADMIN')
   */
  getUserRole(): string {
    const user = this.getUtilisateurConnecte();
    // 'role' correspond au champ renvoyé par votre CustomLoginResponse du back-end
    return user ? user.role : ''; 
  }

  /**
   * Vérifie si l'utilisateur possède l'un des rôles autorisés
   */
  hasAnyRole(allowedRoles: string[]): boolean {
    const currentRole = this.getUserRole();
    return allowedRoles.includes(currentRole);
  }

  /**
   * Déconnexion : supprime les données de session
   */
  deconnecter(): void {
    localStorage.removeItem('currentUser');
  }

}