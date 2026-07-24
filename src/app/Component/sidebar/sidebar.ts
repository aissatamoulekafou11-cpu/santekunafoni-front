import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;

  // Propriétés pour l'affichage conditionnel du menu (*ngIf)
  role: string = localStorage.getItem('role') || '';

  get isAdmin(): boolean {
    return this.role === 'ADMIN' || true; // passe à true par défaut si non connecté
  }

  get isAgent(): boolean {
    return this.role === 'AGENT_SANTE';
  }

  get isPatient(): boolean {
    return this.role === 'PATIENT';
  }
}