import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;

}
