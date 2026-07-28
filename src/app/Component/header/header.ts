import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminAjouter } from '../../Pages/admin-dashboard/admin-ajouter/admin-ajouter';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [RouterLink, AdminAjouter],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
userName: string = '';
  userRole: string = '';

  // Injection du AuthService dans le constructeur
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupération de l'utilisateur connecté stocké dans le localStorage
    const user = this.authService.getUtilisateurConnecte();

    if (user) {
      this.userName = user.nom || 'Utilisateur'; 
      this.userRole = user.role || '';
    }
  }
}
