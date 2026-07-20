import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { SidebarComponent } from "../sidebar-component/sidebar-component";
import { Traitement } from '../../Models/traitement.model';

@Component({
  selector: 'app-modifier-traitement-component',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './modifier-traitement-component.html',
  styleUrl: './modifier-traitement-component.css',
})
export class ModifierTraitementComponent implements OnInit {

  // ID du traitement récupéré dans l'URL
  idTraitementActuel!: number;

  // Listes déroulantes (Signals)
  idPatients = signal<any[]>([]);
  idAgent = signal<any[]>([]);
  idMaladie = signal<any[]>([]);

  // Objet de liaison ngModel local
  traitement = {
    nomTraitement: '',
    description: '',
    datedebut: null,
    datefin: null,
    id_patient: 0,
    id_maladie: 0,
    id_agent_sante: 0
  };

  // Getters/Setters pour les inputs textuels
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
    private route: ActivatedRoute, // 🟢 Pour lire l'ID de l'URL
    private router: Router
  ) {}

  async ngOnInit() {
    // 1. Récupération de l'ID du traitement à modifier depuis l'URL
    this.idTraitementActuel = Number(this.route.snapshot.params['id']);

    // 2. Chargement en parallèle de tous nos selects (patients, agents, maladies)
    await this.chargerDonneesFormulaire();

    // 3. Récupération du traitement actuel depuis la base de données
    this.chargerTraitementAModifier();
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

  chargerTraitementAModifier() {
    this.serviceTraitement.getTraitementById(this.idTraitementActuel).subscribe({
      next: (data: any) => {
        // Pré-remplissage de notre formulaire avec les données existantes
        this.traitement = {
          nomTraitement: data.nomTraitement,
          description: data.description,
          datedebut: data.datedebut,
          datefin: data.datefin,
          id_patient: data.idPatient || data.id_patient,
          id_maladie: data.idMaladie || data.id_maladie,
          id_agent_sante: data.idAgentSante || data.id_agent_sante
        };
      },
      error: (err) => console.error("Impossible de charger le traitement :", err)
    });
  }

  onSubmit() {
    // 4. Reconstruction du DTO au format CamelCase pour Spring Boot
    const traitementModifieDTO: Traitement = {
      idTraitement: this.idTraitementActuel,
      nomTraitement: this.traitement.nomTraitement,
      description: this.traitement.description,
      datedebut: this.traitement.datedebut,
      datefin: this.traitement.datefin,
      idPatient: Number(this.traitement.id_patient),
      idMaladie: Number(this.traitement.id_maladie),
      idAgentSante: Number(this.traitement.id_agent_sante)
    };

    if (!traitementModifieDTO.idPatient || !traitementModifieDTO.idMaladie || !traitementModifieDTO.idAgentSante) {
      alert("Veuillez sélectionner des identifiants valides.");
      return;
    }

    // 5. Envoi de la requête de modification
    this.serviceTraitement.modifierTraitement(this.idTraitementActuel, traitementModifieDTO).subscribe({
      next: () => {
        console.log("Traitement modifié avec succès !");
        this.router.navigate(['/liste-traitement']); // 🟢 Utilise la bonne route (avec ou sans 's')
      },
      error: (err) => {
        console.error("Erreur lors de la modification :", err);
      }
    });
  }

  onAnnuler() {
    this.router.navigate(['/liste-traitement']);
  }
}