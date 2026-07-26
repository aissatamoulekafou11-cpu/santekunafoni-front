import { Component, computed, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maladie } from '../../../Models/maladie.model';
import { FormsModule } from '@angular/forms';
import { MaladieService } from '../../../Services/maladie.service';
import { Header } from "../../../Component/header/header";
import { SidebarComponent } from "../../sidebar-component/sidebar-component";
import { RouterOutlet } from "@angular/router";
import { Sidebar } from '../../../Component/sidebar/sidebar';

type ModalMode = 'none' | 'form' | 'info' | 'delete';

@Component({
  selector: 'app-maladies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
  ],
  templateUrl: './liste-maladie.html',
  styleUrl: './liste-maladie.css'
})
export class ListeMaladieComponent implements OnInit {

  private maladieService = inject(MaladieService);

  // Les maladies venant du backend
  maladies = this.maladieService.Maladies;

  // =========================
  // PAGINATION (Nouveau)
  // =========================
  pageCourante = signal<number>(1);
  elementsParPage = 5;

  constructor() {
    // Sécurité Recherche : Dès que le searchTerm change, 
    // la pagination revient automatiquement à la page 1.
    effect(() => {
      this.searchTerm();
      this.pageCourante.set(1);
    });
  }

  ngOnInit() {
    // Chargement des maladies depuis Spring Boot
    this.maladieService.getMaladies();
  }

  // =========================
  // RECHERCHE & FILTRAGE
  // =========================
  searchTerm = signal('');

  filteredMaladies = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    let results = this.maladies();

    if (term) {
      results = results.filter((maladie: Maladie) => {
        const nom = (maladie.nom || '').toLowerCase();
        const description = (maladie.description || '').toLowerCase();
        const dateDec = (maladie.dateDeclaration || '').toLowerCase();
        const idStr = maladie.idMaladie ? String(maladie.idMaladie).toLowerCase() : '';

        return (
          nom.includes(term) ||
          description.includes(term) ||
          dateDec.includes(term) ||
          idStr.includes(term)
        );
      });
    }
    return results;
  });

  // =========================
  // PAGINATION CALCULÉE (Nouveau)
  // =========================
  
  // Extrait uniquement les 5 éléments à afficher basés sur la liste déjà filtrée
  maladiesPageAffichees = computed(() => {
    const indexDebut = (this.pageCourante() - 1) * this.elementsParPage;
    const indexFin = indexDebut + this.elementsParPage;
    return this.filteredMaladies().slice(indexDebut, indexFin);
  });

  // Calcule dynamiquement les numéros de page requis (ex:)
  totalPagesArray = computed(() => {
    const nbPages = Math.ceil(this.filteredMaladies().length / this.elementsParPage);
    return Array.from({ length: nbPages }, (_, i) => i + 1);
  });

  // Gère le clic sur les boutons Précédent / Numéros / Suivant
  changerPage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPagesArray().length) {
      this.pageCourante.set(page);
    }
  }

  // =========================
  // MODALES
  // =========================
  currentMode = signal<ModalMode>('none');
  selectedMaladie = signal<Maladie | null>(null);

  formModel: Maladie = {
    nom: '',
    description: '',
    dateDeclaration: ''
  };

  // =========================
  // AJOUT
  // =========================
  openAddModal() {
    this.selectedMaladie.set(null);
    this.formModel = {
      nom: '',
      description: '',
      dateDeclaration: ''
    };
    this.currentMode.set('form');
  }

  // =========================
  // MODIFICATION
  // =========================
 openEditModal(maladie: Maladie) {
    this.selectedMaladie.set(maladie);

    // Si la date est un LocalDate (ex: "2026-06-05"), on lui ajoute "T00:00" pour l'input datetime-local
    let formattedDate = '';
    if (maladie.dateDeclaration) {
      const dateStr = String(maladie.dateDeclaration);
      // Si la date contient déjà un 'T' ou un espace, on prend juste les 10 premiers caractères (la date)
      const dateOnly = dateStr.split('T')[0].split(' ')[0];
      formattedDate = dateOnly + 'T00:00';
    }

    this.formModel = {
      ...maladie,
      dateDeclaration: formattedDate
    };
    
    this.currentMode.set('form');
  }
  // =========================
  // DETAILS
  // =========================
  openInfoModal(maladie: Maladie) {
    this.selectedMaladie.set(maladie);
    this.currentMode.set('info');
  }

  // =========================
  // SAUVEGARDE
  // =========================
  sauvegarder() {
    if (!this.formModel.nom.trim() || !this.formModel.description.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (this.selectedMaladie()) {
      this.maladieService
        .updateMaladie(this.formModel.idMaladie!, this.formModel)
        .subscribe({
          next: (maladieModifiee) => {
            this.maladies.update((liste) =>
              liste.map((maladie) =>
                maladie.idMaladie === maladieModifiee.idMaladie ? maladieModifiee : maladie
              )
            );
            this.closeModal();
          },
          error: (err) => {
            console.log(err);
            alert("Erreur lors de la modification");
          }
        });
    } else {
      this.maladieService
        .createMaladie(this.formModel)
        .subscribe({
          next: (nouvelleMaladie) => {
            this.maladies.update((liste) => [...liste, nouvelleMaladie]);
            this.closeModal();
          },
          error: (err) => {
            console.log(err);
            alert("Erreur lors de l'ajout");
          }
        });
    }
  }

 // =========================
  // SUPPRESSION
  // =========================
  openDeleteModal(maladie: Maladie) {
    this.selectedMaladie.set(maladie);
    this.currentMode.set('delete');
  }

  confirmerSuppression() {
    const maladie = this.selectedMaladie();
    if (maladie && maladie.idMaladie) {
      // Appel du service pour supprimer dans la base de données Spring Boot
      // Appel du service pour supprimer dans la base de données Spring Boot
      this.maladieService['deleteMaladie'](maladie.idMaladie).subscribe({
        next: () => {
          // Mise à jour de la liste locale après la suppression réussie en base
          this.maladies.update((liste) =>
            liste.filter((item) => item.idMaladie !== maladie.idMaladie)
          );
          this.closeModal();
        },
        error: (err: any) => {
          console.error(err);
          alert("Erreur lors de la suppression de la maladie");
        }
      });
    } else {
      this.closeModal();
    }
  }
  // =========================
  // FERMER MODAL
  // =========================
  closeModal() {
    this.currentMode.set('none');
    this.selectedMaladie.set(null);
  }
}
