import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGaugeHigh, faUserNurse, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  faGaugeHigh = faGaugeHigh;
  faUserNurse = faUserNurse;
  faUsers = faUsers;
}

//La vrai dynamisation du sidebar, la seule et unique sidebar adapter a tout utilisateur a decommenter apres l'implementation du class authController </Joshua>

// import { Component, OnInit } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive, CommonModule],
//   templateUrl: './sidebar.html',
//   styleUrl: './sidebar.css'
// })
// export class Sidebar implements OnInit {

//   // Rôle de l'utilisateur connecté
//   role: string = '';

//   ngOnInit(): void {
//     // Récupère le rôle depuis localStorage (mis lors de la connexion)
//     this.role = localStorage.getItem('role') || '';
//   }

//   // Vérifie si l'utilisateur est admin
//   get isAdmin(): boolean {
//     return this.role === 'ADMIN';
//   }

//   // Vérifie si l'utilisateur est agent de santé
//   get isAgent(): boolean {
//     return this.role === 'AGENT_SANTE';
//   }

//   // Vérifie si l'utilisateur est patient
//   get isPatient(): boolean {
//     return this.role === 'PATIENT';
//   }
// }