import { Component } from '@angular/core';
import { Traitement } from '../../Models/traitement.model'; // Ajuste les ../ selon le dossier
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-traitement-component',
  imports: [FormsModule],
  templateUrl: './ajouter-traitement-component.html',
  styleUrl: './ajouter-traitement-component.css',
})
export class AjouterTraitementComponent {
  traitement: Traitement = {
    idTraitement: 0,
    datedebut: null,
    datefin: null,
    description: '',
    nomTraitement: '',
    id_agent_sante: 0,
    id_maladie: 0,
    id_patient: 0
  };
  constructor(private traitementService: ServiceTraitement, private router: Router) {
  }
  onSubmit(){
    this.traitementService.ajouterTraitement(this.traitement).subscribe(() => {
      this.router.navigate(['/traitements']);
    });
  }
  onAnnuler() {
    this.router.navigate(['/traitements']); // Redirection si clic sur Annuler
  }
}
