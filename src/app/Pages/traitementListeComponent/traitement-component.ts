import { Component, OnInit, signal } from '@angular/core';
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
  
  // Signal stockant la source de données brute
  traitements = signal<Traitement[]>([]);
  
  // Tous les traitements correspondant au filtre actuel
  traitementsFiltres: Traitement[] = [];
  
  searchTerm: string = '';

  // 🟢 VARIABLES DE PAGINATION
  currentPage: number = 1;
  itemsPerPage: number = 5; // Modifie cette valeur pour afficher plus/moins d'éléments par page

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
        const listeData = Array.isArray(donnees) ? donnees : [];
        this.traitements.set(listeData); 
        this.traitementsFiltres = [...listeData];
      },
      error: (err) => {
        console.error("Erreur d'appel API :", err);
      }
    });
  }

  filtrer(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.currentPage = 1; // Remet à la page 1 lors d'une nouvelle recherche

    if (!term) {
      this.traitementsFiltres = [...this.traitements()]; 
    } else {
      this.traitementsFiltres = this.traitements().filter((t: Traitement) => {
        const nom = t.nomTraitement ? t.nomTraitement.toLowerCase() : '';
        const desc = t.description ? t.description.toLowerCase() : '';
        return nom.includes(term) || desc.includes(term);
      });
    }
  }

  // 🟢 GETTER : Découpe la liste filtrée pour n'afficher que la page courante dans le HTML
  get traitementsPagines(): Traitement[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.traitementsFiltres.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // 🟢 GETTER : Calcule le nombre total de pages nécessaires
  get totalPages(): number {
    return Math.ceil(this.traitementsFiltres.length / this.itemsPerPage) || 1;
  }

  // 🟢 GETTER : Génère le tableau des numéros de pages [1, 2, 3...]
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // 🟢 METHODES POUR CHANGER DE PAGE
  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  pagePrecedente(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  pageSuivante(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  supprimerTraitement(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce traitement ?")) {
      this.serviceTraitement.deleteTraitement(id).subscribe({
        next: () => {
          this.traitements.update(liste => liste.filter(t => t.idTraitement !== id));
          this.filtrer();
          
          // Si on supprime le dernier élément d'une page, on recule d'une page
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
          }

          alert("Traitement supprimé avec succès !");
        },
        error: (err) => {
          console.error("Erreur lors de la suppression :", err);
          alert("Impossible de supprimer le traitement.");
        }
      });
    }
  }
}