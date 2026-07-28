import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-header',
    standalone: true,
  imports: [],
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
