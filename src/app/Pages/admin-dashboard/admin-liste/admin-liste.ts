import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
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

  constructor(private administrateurService: AdministrateurService) {}

  ngOnInit(): void {
    this.chargerAdministrateurs();
  }

  chargerAdministrateurs(): void {
    this.administrateurService.getAdministrateurs().subscribe({
      next: (data) => {
        this.administrateurs = data;
      },
      error: (err) => {
        console.error("Erreur :", err);
      }
    });
}

supprimerAdministrateur(idUtilisateur: number | undefined): void {
    if (!idUtilisateur) {
      console.warn("L'ID de l'administrateur est invalide.");
      return;
    }

    if (confirm('Voulez-vous vraiment supprimer cet administrateur ?')) {
      this.administrateurService.deleteAdministrateur(idUtilisateur).subscribe({
        next: () => {
          // 3. Mise à jour de la liste locale pour retirer l'admin sans recharger tout depuis le backend
          this.administrateurs = this.administrateurs.filter(
            (admin) => admin.idUtilisateur !== idUtilisateur
          );
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        },
      });
    }
}

}
