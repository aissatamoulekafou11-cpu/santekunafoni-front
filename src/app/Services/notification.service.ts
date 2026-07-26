import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification, NotificationRequestDto } from '../Models/notification.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Correspond exactement à @RequestMapping("/api/notification") dans Spring Boot
  private apiUrl = `${environment.apiUrl}/notification`;

  constructor(private http: HttpClient) {}

  /**
   * Récupérer toutes les notifications
   * GET /api/notification
   */
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  /**
   * Récupérer les notifications associées à un utilisateur spécifique
   * GET /api/notification/utilisateur/{userId}
   */
  getByUtilisateur(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/utilisateur/${userId}`);
  }

  /**
   * Envoyer une notification manuellement
   * POST /api/notification
   */
  envoyerNotification(notification: NotificationRequestDto): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  /**
   * Marquer une notification comme lue
   * PUT /api/notification/{id}/lue
   */
  marquerCommeLue(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}/lue`, {}, { responseType: 'text' });
  }

  /**
   * Vérifier le seuil épidémique et créer une notification automatique
   * POST /api/notification/verifier-epidemie/{idMaladie}
   */
  verifierEpidemie(idMaladie: number): Observable<string> {
    return this.http.post(`${this.apiUrl}/verifier-epidemie/${idMaladie}`, {}, { responseType: 'text' });
  }
}