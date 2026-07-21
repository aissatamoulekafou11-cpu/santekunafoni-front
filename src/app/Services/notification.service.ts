import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification, NotificationRequestDto } from '../Models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // Correspond exactement à @RequestMapping("/api/notification")
  private apiUrl = 'http://localhost:8080/api/notification';

  constructor(private http: HttpClient) {}

  // GET /api/notification
  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl);
  }

  // GET /api/notification/utilisateur/{userId}
  getByUtilisateur(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.apiUrl}/utilisateur/${userId}`
    );
  }

  // POST /api/notification
  // Notification ordinaire — envoyée manuellement
  envoyerNotification(notification: NotificationRequestDto): Observable<Notification> {
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$",notification)
    return this.http.post<Notification>(this.apiUrl, notification);
  }

  // PUT /api/notification/{id}/lue
  marquerCommeLue(id: number): Observable<string> {
    return this.http.put(
      `${this.apiUrl}/${id}/lue`,
      {},
      { responseType: 'text' }
    );
  }

  // POST /api/notification/verifier-epidemie/{idMaladie}
  // Notification automatique — créée par Spring Boot si seuil dépassé
  verifierEpidemie(idMaladie: number): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/verifier-epidemie/${idMaladie}`,
      {},
      { responseType: 'text' }
    );
  }
}