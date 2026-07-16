import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// 1. Importe les icônes nécessaires
import { faGaugeHigh, faUserNurse, faUsers, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
  imports: [FontAwesomeModule]
})
export class SidebarComponent {
  // 2. Déclare les propriétés pour les utiliser dans le HTML
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;
  faBell = faBell;
}