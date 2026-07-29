import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
// export class Sidebar {
//   constructor(public authService: AuthService) {}
// }

export class Sidebar implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    console.log("Rôle actuel détecté par la Sidebar :", this.authService.getUserRole());
  }
}
