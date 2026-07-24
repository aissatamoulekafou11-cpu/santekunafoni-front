import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { Traitement } from '../../Models/traitement.model';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-ajouter-traitement-component',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './ajouter-traitement-component.html',
  styleUrl: './ajouter-traitement-component.css',
})
export class AjouterTraitementComponent implements OnInit {

  // Signals pour les référentiels
  idPatients = signal<any[]>([]);
  idAgent = signal<any[]>([]);
  idMaladie = signal<any[]>([]);

  // Variables pour gérer les messages d'état dans la vue
  messageSucces: string | null = null;
  messageErreur: string | null = null;

  // L'objet lié à tes directives [(ngModel)] dans le HTML
  traitement = {
    nomTraitement: '',
    description: '',
    datedebut: null,
    datefin: null,
    id_patient: 0,
    id_maladie: 0,
    id_agent_sante: 0
  };

  // Raccourcis
  get nomTraitement() { return this.traitement.nomTraitement; }
  set nomTraitement(val) { this.traitement.nomTraitement = val; }
  get description() { return this.traitement.description; }
  set description(val) { this.traitement.description = val; }
  get datedebut() { return this.traitement.datedebut; }
  set datedebut(val) { this.traitement.datedebut = val; }
  get datefin() { return this.traitement.datefin; }
  set datefin(val) { this.traitement.datefin = val; }

  constructor(
    private serviceTraitement: ServiceTraitement,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.chargerDonneesFormulaire();
  }

  async chargerDonneesFormulaire() {
    try {
      const resPatients = await fetch('http://localhost:8080/api/patients');
      this.idPatients.set(await resPatients.json());

      const resAgents = await fetch('http://localhost:8080/api/agents');
      this.idAgent.set(await resAgents.json());

      const resMaladies = await fetch('http://localhost:8080/api/maladies');
      this.idMaladie.set(await resMaladies.json());

    } catch (error) {
      console.error("Erreur lors du chargement des listes :", error);
    }
  }

  onSubmit() {
    this.messageSucces = null;
    this.messageErreur = null;

    const nouveauTraitementDTO: Traitement = {
      idTraitement: 0,
      nomTraitement: this.traitement.nomTraitement,
      description: this.traitement.description,
      datedebut: this.traitement.datedebut,
      datefin: this.traitement.datefin,
      idPatient: Number(this.traitement.id_patient),
      idMaladie: Number(this.traitement.id_maladie),
      idAgentSante: Number(this.traitement.id_agent_sante)
    };

    // Validation des sélections
    if (!nouveauTraitementDTO.idPatient || !nouveauTraitementDTO.idMaladie || !nouveauTraitementDTO.idAgentSante) {
      this.messageErreur = "Veuillez sélectionner un Patient, une Maladie et un Agent de santé valide.";
      return;
    }

    // Appel au service
    this.serviceTraitement.ajouterTraitement(nouveauTraitementDTO).subscribe({
      next: (response) => {
        console.log("Traitement enregistré avec succès !", response);
        this.messageSucces = "Traitement enregistré avec succès !";
        
        alert("Traitement enregistré avec succès !");
        
        setTimeout(() => {
          this.router.navigate(['/liste-traitement']);
        }, 1000);
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement :", err);
        this.messageErreur = "Erreur lors de l'enregistrement du traitement. Veuillez réessayer.";
      }
    });
  }

  onAnnuler() {
    this.router.navigate(['/liste-traitement']);
  }
}