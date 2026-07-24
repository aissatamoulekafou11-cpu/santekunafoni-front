import { Component, computed, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maladie } from '../../../Models/maladie.model';
import { FormsModule } from '@angular/forms';
import { MaladieService } from '../../../Services/maladie.service';
import { Header } from "../../../Component/header/header";
import { SidebarComponent } from "../../sidebar-component/sidebar-component";
import { Sidebar } from '../../../Component/sidebar/sidebar';

type ModalMode = 'none' | 'form' | 'info' | 'delete';


@Component({
  selector: 'app-maladies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Sidebar
  ],
  templateUrl: './liste-maladie.html',
  styleUrl: './liste-maladie.css'
})


export class ListeMaladieComponent implements OnInit {


  private maladieService = inject(MaladieService);

  // Les maladies venant du backend
  maladies = this.maladieService.Maladies;



  ngOnInit() {

    // Chargement des maladies depuis Spring Boot
    this.maladieService.getMaladies();

  }



  // =========================
  // RECHERCHE
  // =========================

  searchTerm = signal('');


  filteredMaladies = computed(() => {

    const term = this.searchTerm()
      .trim()
      .toLowerCase();


    let results = this.maladies();


    if (term) {

      results = results.filter((maladie: Maladie) => {


        const nom = (maladie.nom || '').toLowerCase();

        const description = (maladie.description || '').toLowerCase();

        const dateDec = (maladie.dateDeclaration || '').toLowerCase();


        const idStr = maladie.idMaladie
          ? String(maladie.idMaladie).toLowerCase()
          : '';


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


    this.formModel = {
      ...maladie
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
    if (
      !this.formModel.nom.trim() ||
      !this.formModel.description.trim()
    ) {

      alert("Veuillez remplir tous les champs !");

      return;

    }
    // =========================
    // CAS MODIFICATION
    // =========================

    if (this.selectedMaladie()) {


      this.maladieService
        .updateMaladie(
          this.formModel.idMaladie!,
          this.formModel
        )
        .subscribe({

          next: (maladieModifiee) => {


            this.maladies.update(
              (liste) =>

                liste.map((maladie) =>

                  maladie.idMaladie === maladieModifiee.idMaladie
                    ? maladieModifiee
                    : maladie

                )

            );
            this.closeModal();

          },
          error: (err) => {

            console.log(err);
            alert("Erreur lors de la modification");
          }
        });


    }



    // =========================
    // CAS AJOUT
    // =========================

    else {


      this.maladieService
        .createMaladie(this.formModel)
        .subscribe({

          next: (nouvelleMaladie) => {


            this.maladies.update(
              (liste) => [
                ...liste,
                nouvelleMaladie
              ]
            );


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
     if (maladie) {
      this.maladies.update(
        (liste) =>

          liste.filter(
            (item) =>
              item.idMaladie !== maladie.idMaladie
          )

      );

    }

    this.closeModal();
  }
  // =========================
  // FERMER MODAL
  // =========================
  closeModal() {
    this.currentMode.set('none');
    this.selectedMaladie.set(null);
  }
}