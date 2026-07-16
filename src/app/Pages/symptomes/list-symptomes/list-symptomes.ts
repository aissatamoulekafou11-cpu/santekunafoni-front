import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Symptome } from '../../../Models/symptome.model';
import { SymptomeService } from '../../../Services/symptome.service';
import { Sidebar } from '../../../Component/sidebar/sidebar';

type ModalMode = 'none' | 'form' | 'info' | 'delete' | 'custom';

@Component({
  selector: 'app-list-symptomes',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './list-symptomes.html',
  styleUrl: './list-symptomes.css'
})
export class ListSymptomesComponent {
  private symptomeService = inject(SymptomeService);
  symptomes = this.symptomeService.symptomes;

  searchTerm = signal('');

  filteredSymptomes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) return this.symptomes();

    return this.symptomes().filter((s: Symptome) =>
      s.nom.toLowerCase().includes(term) ||
      s.description.toLowerCase().includes(term) ||
      s.id.toString().includes(term)
    );
  });

  // Gestion des Modals
  currentMode = signal<ModalMode>('none');
  selectedSymptome = signal<Symptome | null>(null);

  // Modèle lié aux champs de saisie du formulaire
  formModel = { id: 0, nom: '', description: '', dateCreation: '' };

  // 1. ACTION : Ouvrir en mode Ajout
  openAddModal() {
    this.selectedSymptome.set(null);
    this.formModel = {
      id: this.symptomes().length > 0 ? Math.max(...this.symptomes().map(s => s.id)) + 1 : 1,
      nom: '',
      description: '',
      dateCreation: '11/07/2026'
    };
    this.currentMode.set('form');
  }

  // 2. ACTION : Ouvrir en mode Modification
  openEditModal(symptome: Symptome) {
    this.selectedSymptome.set(symptome);
    this.formModel = { ...symptome };
    this.currentMode.set('form');
  }

  // 3. ACTION : Ouvrir en mode Détails (Info)
  openInfoModal(symptome: Symptome) {
    this.selectedSymptome.set(symptome);
    this.currentMode.set('info');
  }

  // Enregistrement de l'Ajout ou de la Modification
  sauvegarder() {
    if (!this.formModel.nom.trim() || !this.formModel.description.trim()) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    const index = this.symptomes().findIndex((s: Symptome) => s.id === this.formModel.id);

    if (index !== -1) {
      // Mode Modification
      this.symptomes.update(list => {
        list[index] = { ...this.formModel };
        return [...list];
      });
    } else {
      // Mode Ajout
      this.symptomes.update(list => [...list, { ...this.formModel }]);
    }

    this.closeModal();
  }

  // 4. ACTION : Suppression d'un symptôme
  openDeleteModal(symptome: Symptome) {
    this.selectedSymptome.set(symptome);
    this.currentMode.set('delete');
  }

  confirmerSuppression() {
    const s = this.selectedSymptome();
    if (s) {
      this.symptomes.update(list => list.filter((item: Symptome) => item.id !== s.id));
    }
    this.closeModal();
  }

  closeModal() {
    this.currentMode.set('none');
    this.selectedSymptome.set(null);
  }

  // 5. ACTION : Ouvrir ma modal personnalisée
  openCustomModal() {
    this.currentMode.set('custom');
  }
}

