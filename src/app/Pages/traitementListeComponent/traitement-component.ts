import { Component, OnInit, signal, computed } from '@angular/core'; // <-- Ajout de computed
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';     
import { Traitement } from '../../Models/traitement.model';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-traitement',
  standalone: true,
  imports: [
    RouterLink, 
    SidebarComponent, 
    CommonModule, 
    FormsModule  
  ],
  templateUrl: './traitement-component.html',
  styleUrl: './traitement-component.css',
})
export class ListeTraitement implements OnInit {
  
  // 1. La liste brute issue de la BDD
  traitements = signal<Traitement[]>([]);
  
  // 2. Le terme de recherche devient lui aussi un Signal
  searchTerm = signal<string>('');

  // 3. La liste filtrée se calcule TOUTE SEULE et en temps réel !
  traitementsFiltres = computed(() => {
    const listeBrute = this.traitements();
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return listeBrute; // Si vide, renvoie tout
    }

    return listeBrute.filter((t: Traitement) => 
      t.nomTraitement.toLowerCase().includes(term) || 
      (t.description && t.description.toLowerCase().includes(term))
    );
  });

  constructor(
    private serviceTraitement: ServiceTraitement,
    // private router: Router
  ) {}

  ngOnInit() {
    this.loadTraitement();
  }

  loadTraitement() {
    this.serviceTraitement.getAllTraitement().subscribe({
      next: (donnees) => {
        console.log("Données reçues :", donnees);
        this.traitements.set(donnees); // Met à jour le Signal et recalcule le tableau automatiquement
      },
      error: (err) => {
        console.error("Erreur d'appel API :", err);
      }
    });
  }

  supprimerTraitement(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce traitement ?")) {
      this.serviceTraitement.deleteTraitement(id).subscribe({
        next: () => {
          console.log("Traitement supprimé avec succès !");
          // Mettre à jour le Signal suffit, la liste affichée s'adaptera seule
          this.traitements.update(liste => liste.filter(t => t.idTraitement !== id));
          alert("Traitement supprimé avec succès !!!!!");
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
          alert("Impossible de supprimer le traitement.");
        }
      });
    }
  }
}