import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Maladie } from '../../../Models/maladie.model';
@Component({
  selector: 'app-maladies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-maladie.html',
  styleUrls: ['./liste-maladie.css']
})
export class MaladiesComponent implements OnInit {
  // Liste complète (simulation de base de données)
  allMaladies: Maladie[] = [
    { id: 1, nom: 'Paludisme', description: 'Maladie infectieuse..', dateDeclaration: '05-05-2026' },
    { id: 2, nom: 'Thyphoïde', description: 'Causé par bacteries..', dateDeclaration: '01-06-2026' },
    { id: 3, nom: 'Hépatite B', description: 'Apparaît ..', dateDeclaration: '10-07-2026' }
  ];

  // Liste filtrée affichée à l'écran
  filteredMaladies: Maladie[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.filteredMaladies = [...this.allMaladies];
  }

  // Fonction de recherche en temps réel
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredMaladies = [...this.allMaladies];
    } else {
      this.filteredMaladies = this.allMaladies.filter(m => 
        m.nom.toLowerCase().includes(term) || 
        m.description.toLowerCase().includes(term)
      );
    }
  }

  // Actions de la page
  onAjouter(): void {
    console.log('Ajouter une maladie');
  }

  onFiltrer(): void {
    console.log('Ouvrir les filtres');
  }

  onEdit(id: number): void {
    console.log('Modifier la maladie avec ID:', id);
  }

  onViewInfo(id: number): void {
    console.log('Afficher les détails de la maladie avec ID:', id);
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette maladie ?')) {
      this.allMaladies = this.allMaladies.filter(m => m.id !== id);
      this.onSearch(); // Rafraîchir la liste affichée
    }
  }
}