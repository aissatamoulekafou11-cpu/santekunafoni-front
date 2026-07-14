import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Import des modules nécessaires
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faUserPlus, 
  faRightToBracket, 
  faBolt, 
  faUserCheck, 
  faDesktop 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accueil',
  standalone: true,
  // Ajout du module FontAwesome dans les imports
  imports: [FontAwesomeModule],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css']
})
export class AccueilComponent {
  // Déclaration des icônes pour utilisation dans le HTML
  faUserPlus = faUserPlus;
  faRightToBracket = faRightToBracket;
  faBolt = faBolt;
  faUserCheck = faUserCheck;
  faDesktop = faDesktop;

  constructor(private router: Router) {}

  allerInscription(): void {
    this.router.navigate(['/inscription']);
  }

  allerConnexion(): void {
    this.router.navigate(['/connexion']);
  }
}