import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // 1. Importer le module
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons'; // 2. Importer les icônes

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule], // 3. Ajouter le module ici
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  // 4. Déclarer les variables pour qu'elles soient utilisables dans le HTML
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;
}