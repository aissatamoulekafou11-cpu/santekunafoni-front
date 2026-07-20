import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { AgentDashboardService } from '../../Services/agent-dashboard.service';
import { Patient } from '../../Models/patient.model'; 
import { forkJoin } from 'rxjs'; 

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarComponent
  ],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard implements OnInit {
  private dashboardService = inject(AgentDashboardService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef); // 🔥 Injecté pour forcer l'affichage immédiat des données

  // Cartes statistiques
  nombrePatients = 0;
  nombreSymptomes = 0;
  nombreMaladies = 0;
  nombreTraitements = 0;

  // Répartition par sexe
  pourcentageHommes = 0;
  pourcentageFemmes = 0;

  // Données des tableaux fortement typées
  derniersPatients: Patient[] = []; 
  topSymptomes: any[] = []; 

  ngOnInit(): void {
    this.chargerDonneesDashboard();
  }

  // Méthode de redirection pour le bouton "Voir tout"
  voirPlus(): void {
    this.router.navigate(['/patient']); 
  }

  chargerDonneesDashboard(): void {
    // 🔥 On regroupe tout dans un seul forkJoin pour exécuter les requêtes en parallèle 
    // et éviter le bug de l'écran qui reste vide au démarrage
    forkJoin({
      patientsCount: this.dashboardService.getNombrePatients(),
      derniers: this.dashboardService.getDerniersPatients(),
      maladies: this.dashboardService.getMaladies(),
      symptomes: this.dashboardService.getSymptomes(),
      traitements: this.dashboardService.getTraitements(),
      hommes: this.dashboardService.getNombreHommes(),
      femmes: this.dashboardService.getNombreFemmes()
    }).subscribe({
      next: (res) => {
        // 1. Assignation des compteurs principaux
        this.nombrePatients = Number(res.patientsCount);
        this.nombreMaladies = res.maladies ? res.maladies.length : 0;
        this.nombreTraitements = res.traitements ? res.traitements.length : 0;
        
        // 2. Gestion des symptômes (Compteur + Top 4)
        if (res.symptomes) {
          this.nombreSymptomes = res.symptomes.length;
          this.topSymptomes = res.symptomes.slice(0, 4);
        } else {
          this.nombreSymptomes = 0;
          this.topSymptomes = [];
        }

        // 3. Gestion des derniers patients (Limité à 5 pour l'affichage)
        if (Array.isArray(res.derniers)) {
          this.derniersPatients = res.derniers.slice(0, 5);
        } else {
          this.derniersPatients = [];
        }

        // 4. Calcul de la répartition par sexe
        const h = Number(res.hommes);
        const f = Number(res.femmes);
        const total = h + f;
        if (total > 0) {
          this.pourcentageHommes = Math.round((h / total) * 100);
          this.pourcentageFemmes = Math.round((f / total) * 100);
        }

        // 🔥 Force Angular à rafraîchir l'interface graphique immédiatement
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Erreur lors du chargement général du dashboard :', err);
      }
    });
  }
}