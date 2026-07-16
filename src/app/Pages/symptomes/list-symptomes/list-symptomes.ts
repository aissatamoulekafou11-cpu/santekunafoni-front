import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Symptome } from '../../../Models/symptome.model';
import { SymptomeService } from '../../../Services/symptome.service';
import { Sidebar } from "../../../Component/sidebar/sidebar";

type ModalMode = 'none' | 'form' | 'info' | 'delete';

@Component({
  selector: 'app-list-symptomes',
  standalone: true,
  imports: [CommonModule, FormsModule, Sidebar],
  templateUrl: './list-symptomes.html',
  styleUrl: './list-symptomes.css'
})
export class ListSymptomesComponent implements OnInit {

  private symptomeService = inject(SymptomeService);

  symptomes = signal<Symptome[]>([]);

  searchTerm = signal('');

  ngOnInit(): void {
    this.loadSymptomes();
  }

  loadSymptomes() {
    this.symptomeService.getAllSymptomes().subscribe({
      next: (data) => {
        this.symptomes.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  filteredSymptomes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return this.symptomes();
    }

    return this.symptomes().filter((s) =>
      s.nom?.toLowerCase().includes(term) ||
      s.description?.toLowerCase().includes(term) ||
      s.id?.toString().includes(term)
    );
  });

  currentMode = signal<ModalMode>('none');
  selectedSymptome = signal<Symptome | null>(null);

 formModel: Symptome = {
  nom: '',
  description: '',
  dateCreation: ''
};

  openAddModal() {
    this.selectedSymptome.set(null);

    this.formModel = {
 nom:'',
 description:'',
 dateCreation:new Date().toISOString()
};

    this.currentMode.set('form');
  }

  openEditModal(symptome: Symptome) {
    this.selectedSymptome.set(symptome);

    this.formModel = {
      ...symptome
    };

    this.currentMode.set('form');
  }

  openInfoModal(symptome: Symptome) {
    this.selectedSymptome.set(symptome);
    this.currentMode.set('info');
  }

  sauvegarder() {

    if (!this.formModel.nom?.trim() ||
        !this.formModel.description?.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Modification
    if (this.formModel.id) {

      this.symptomeService
        .updateSymptome(this.formModel.id, this.formModel)
        .subscribe({
          next: () => {
            this.loadSymptomes();
            this.closeModal();
          },
          error: err => console.log(err)
        });

    } else {

      // Ajout
      this.symptomeService
        .addSymptome(this.formModel)
        .subscribe({
          next: () => {
            this.loadSymptomes();
            this.closeModal();
          },
          error: err => console.log(err)
        });
    }
  }

  openDeleteModal(symptome: Symptome) {
    this.selectedSymptome.set(symptome);
    this.currentMode.set('delete');
  }

  confirmerSuppression() {

    const s = this.selectedSymptome();

    if (s?.id) {
      this.symptomeService
        .deleteSymptome(s.id)
        .subscribe({
          next: () => {
            this.loadSymptomes();
            this.closeModal();
          },
          error: err => console.log(err)
        });
    }
  }

  closeModal() {
    this.currentMode.set('none');
    this.selectedSymptome.set(null);
  }
}