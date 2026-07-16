import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maladie } from '../../../Models/maladie.model';
import { FormsModule } from '@angular/forms';
import { MaladieService } from '../../../Services/maladie.service';
import { Header } from "../../../Component/header/header";
import { SidebarComponent } from "../../sidebar-component/sidebar-component";

type ModalMode = 'none' | 'form' | 'info' | 'delete';

@Component({
  selector: 'app-maladies',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, SidebarComponent],
  templateUrl: './liste-maladie.html',
  styleUrl: './liste-maladie.css'
})
export class ListeMaladieComponent {
  private maladieService = inject(MaladieService);
  maladies = this.maladieService.Maladies; 

  // --- RECHERCHE & TRI ---
  searchTerm = signal('');
  sortMode = signal<'none' | 'nom' | 'date'>('none');

  // Computed unique qui gère à la fois le filtrage textuel et le tri
  filteredMaladies = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    
    // Étape A : Filtrage par recherche textuelle
    let results = this.maladies();
    if (term) {
      results = results.filter((s: any) => 
        (s.nom || '').toLowerCase().includes(term) || 
        (s.description || '').toLowerCase().includes(term)
      );
    }

    // Étape B : Application du tri selon le mode actif
    const mode = this.sortMode();
    if (mode === 'nom') {
      // Tri alphabétique par nom
      results = [...results].sort((a, b) => 
        (a.nom || '').localeCompare(b.nom || '', 'fr', { sensitivity: 'base' })
      );
    } else if (mode === 'date') {
      // Tri par date (du plus récent au plus ancien)
      results = [...results].sort((a, b) => {
        
        const parseDate = (dStr: any): number => {
          if (!dStr) return 0;
          
          // dStr est déjà au format "YYYY-MM-DD" grâce à LocalDate du backend !
          const time = Date.parse(dStr);
          return isNaN(time) ? 0 : time;
        };

        const timeA = parseDate(a.dateDeclaration);
        const timeB = parseDate(b.dateDeclaration);

        return timeB - timeA; // Plus récent en premier
      });
    }

    return results;
  });

  // Alterner les types de tri au clic
  toggleFilter() {
    const current = this.sortMode();
    if (current === 'none') {
      this.sortMode.set('nom');  // 1er clic : Trie par Nom
    } else if (current === 'nom') {
      this.sortMode.set('date'); // 2e clic : Trie par Date
    } else {
      this.sortMode.set('none'); // 3e clic : Retour à l'état initial
    }
  }

  // --- GESTION DES MODALES ---
  currentMode = signal<ModalMode>('none');
  selectedMaladie = signal<any | null>(null);
  
  // Modèle lié aux champs de saisie du formulaire (idMaladie mappé sur ton entité)
  formModel = { idMaladie: 0, nom: '', description: '', dateDeclaration: '' };

  // 1. ACTION : Ouvrir en mode Ajout
  openAddModal() {
    this.selectedMaladie.set(null);
    this.formModel = { 
      // Récupère l'idMax sur la base de idMaladie
      idMaladie: this.maladies().length > 0 ? Math.max(...this.maladies().map((s: any) => s.idMaladie || 0)) + 1 : 1, 
      nom: '', 
      description: '', 
      dateDeclaration: '2026-07-15' // Format standard YYYY-MM-DD
    };
    this.currentMode.set('form');
  }

  // 2. ACTION : Ouvrir en mode Modification
  openEditModal(maladie: any) {
    this.selectedMaladie.set(maladie);
    this.formModel = { ...maladie }; // Copie locale pour le formulaire
    this.currentMode.set('form');
  }

  // 3. ACTION : Ouvrir en mode Détails (Info)
  openInfoModal(maladie: any) {
    this.selectedMaladie.set(maladie);
    this.currentMode.set('info');
  }

  // Enregistrement de l'Ajout ou de la Modification
  sauvegarder() {
    if (!this.formModel.nom.trim() || !this.formModel.description.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const index = this.maladies().findIndex((s: any) => s.idMaladie === this.formModel.idMaladie);
    
    if (index !== -1) {
      // Mode Modification
      this.maladies.update((list: any[]) => {
        list[index] = { ...this.formModel };
        return [...list];
      });
    } else {
      // Mode Ajout
      this.maladies.update((list: any[]) => [...list, { ...this.formModel }]);
    }
    this.closeModal();
  }

  // 4. ACTION : Suppression d'une maladie
  openDeleteModal(maladie: any) {
    this.selectedMaladie.set(maladie);
    this.currentMode.set('delete');
  }

  confirmerSuppression() {
    const s = this.selectedMaladie();
    if (s) {
      this.maladies.update((list: any[]) => list.filter((item: any) => item.idMaladie !== s.idMaladie));
    }
    this.closeModal();
  }

  closeModal() {
    this.currentMode.set('none');
    this.selectedMaladie.set(null);
  }
}