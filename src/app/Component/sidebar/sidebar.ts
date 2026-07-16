import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // 1. Importer le module
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons'; // 2. Importer les icônes

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;
}
