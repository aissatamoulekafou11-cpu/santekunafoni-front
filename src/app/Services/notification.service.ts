import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../Models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8080/api/notification';

  constructor(private http: HttpClient) {}

  // ── NOTIFICATIONS ORDINAIRES ──────────────────────────

  // GET toutes les notifications
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  // GET notifications d'un utilisateur précis
  getByUtilisateur(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.apiUrl}/utilisateur/${userId}`
    );
  }

  // POST envoyer une notification ordinaire
  envoyerNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  // PUT marquer une notification comme lue
  marquerCommeLue(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}/lue`, {});
  }

  // ── ALERTE ÉPIDÉMIE AUTOMATIQUE ───────────────────────

  // POST déclenche la vérification du seuil (30 cas / 7 jours)
  // Si seuil dépassé → Spring Boot crée automatiquement une notification
  verifierEpidemie(idMaladie: number): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/verifier-epidemie/${idMaladie}`,
      {},
      { responseType: 'text' as 'json' }
    );
  }
}