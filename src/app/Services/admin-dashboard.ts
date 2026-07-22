// src/app/Services/admin-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../Models/dashboard-stats.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  // URL de ton endpoint Spring Boot qui fournit les stats
  private apiUrl = 'http://localhost:8080/api/administrateurs/dashboard-stats';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les compteurs (102 agents, 1408 patients, 15 alertes)
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl);
  }
}