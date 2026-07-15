import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGaugeHigh,
  faUserNurse,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // 1. Importer le module
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons'; // 2. Importer les icônes

@Component({
  selector: 'app-sidebar',
  standalone: true,
<<<<<<< HEAD
  imports: [FontAwesomeModule],
=======
  imports: [FontAwesomeModule], // 3. Ajouter le module ici
>>>>>>> 36f68e070f1d9ddadb7cacf7c9e92ae49099e9b7
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
<<<<<<< HEAD
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;
}

=======
  // 4. Déclarer les variables pour qu'elles soient utilisables dans le HTML
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;
}
>>>>>>> 36f68e070f1d9ddadb7cacf7c9e92ae49099e9b7
