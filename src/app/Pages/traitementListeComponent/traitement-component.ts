import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // <-- Ajouté pour les directives de base (*ngFor, *ngIf)
import { FormsModule } from '@angular/forms';     // <-- Ajouté pour [(ngModel)]
import { Traitement } from '../../Models/traitement.model';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-traitement',
  standalone: true,
  imports: [
    RouterLink, 
    SidebarComponent, 
    CommonModule, // <-- INDISPENSABLE pour ton template HTML
    FormsModule   // <-- INDISPENSABLE pour que [(ngModel)] fonctionne
  ],
  templateUrl: './traitement-component.html',
  styleUrl: './traitement-component.css',
})
export class ListeTraitement implements OnInit {
  
  // 1. On garde ton Signal pour stocker la liste brute de la bdd
  traitements = signal<Traitement[]>([]);
  
  // 2. On déclare la variable qui va stocker les résultats filtrés affichés dans le tableau
  traitementsFiltres: Traitement[] = [];
  
  searchTerm: string = '';

  constructor(
    private serviceTraitement: ServiceTraitement,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTraitement();
  }

  loadTraitement() {
    this.serviceTraitement.getAllTraitement().subscribe({
      next: (donnees) => {
        console.log("Données reçues :", donnees);
        this.traitements.set(donnees); // Met à jour le Signal
        this.traitementsFiltres = donnees; // Initialise le tableau filtré avec toutes les données au départ
      },
      error: (err) => {
        console.error("Erreur d'appel API :", err);
      }
    });
  }

  filtrer(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      // 3. On utilise les parenthèses () pour extraire les données du Signal
      this.traitementsFiltres = this.traitements(); 
    } else {
      // 4. On filtre sur le tableau extrait du Signal
      this.traitementsFiltres = this.traitements().filter((t: Traitement) => 
          t.nomTraitement.toLowerCase().includes(term) || 
          (t.description && t.description.toLowerCase().includes(term))
);
    }
  }
}