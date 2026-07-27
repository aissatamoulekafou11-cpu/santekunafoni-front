import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminAjouter } from '../../Pages/admin-dashboard/admin-ajouter/admin-ajouter';

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [RouterLink, AdminAjouter],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
