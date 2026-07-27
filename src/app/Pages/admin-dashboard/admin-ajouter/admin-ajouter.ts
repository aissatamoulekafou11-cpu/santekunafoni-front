import { FormsModule } from '@angular/forms'; 
import { Component, Output, EventEmitter } from '@angular/core';
import { Administrateur } from '../../../Models/administrateur.model';
import { AdminDashboardService } from '../../../Services/admin-dashboard.service'; // 👈 Vérifiez le chemin relatif

@Component({
  selector: 'app-admin-ajouter',
  imports: [FormsModule],
  templateUrl: './admin-ajouter.html',
  styleUrl: './admin-ajouter.css',
})
export class AdminAjouter {
  @Output() adminAjoute = new EventEmitter<void>();

  nouvelAdmin: Administrateur = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: ''
  };


}
  