import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard {

  // Cartes statistiques
  nombrePatients = 0;
  nombreSymptomes = 0;
  nombreMaladies = 0;
  nombreTraitements = 0;

  // Répartition par sexe
  pourcentageHommes = 0;
  pourcentageFemmes = 0;

  // Données des tableaux
  derniersPatients: any[] = [];

  topSymptomes: any[] = [];

}