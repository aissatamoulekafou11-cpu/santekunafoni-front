import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Administrateur } from '../../../Models/administrateur.model';
import { AdministrateurService } from '../../../Services/administrateur';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-liste',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-liste.html',
  styleUrl: './admin-liste.css',
})
export class AdminListe implements OnInit {
    administrateurs: Administrateur[] = [];

  constructor(private administrateurService: AdministrateurService,
      private cd: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    console.log("AdminListe chargé");
    this.chargerAdministrateurs();
  }

  chargerAdministrateurs(): void {
    this.administrateurService.getAdministrateurs().subscribe({
      next: (data) => {
        console.log("Données reçues :", data);
        this.administrateurs = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("Erreur :", err);
      }
    });
}

adminSelectionne!: Administrateur;
showEditModal = false;
showDeleteModal = false;


openEditModal(admin: Administrateur) {

  this.adminSelectionne = admin;
  this.showEditModal = true;

}

openDeleteModal(admin: Administrateur) {

  this.adminSelectionne = admin;
  this.showDeleteModal = true;

}


}
