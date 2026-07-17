import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { Traitement } from '../../Models/traitement.model';
import { Sidebar } from '../../Component/sidebar/sidebar';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-ajouter-traitement-component',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent],
  templateUrl: './ajouter-traitement-component.html',
  styleUrl: './ajouter-traitement-component.css',
})
export class AjouterTraitementComponent implements OnInit {

  // 1. Les conteneurs (Signals) nommés exactement comme dans ton HTML
  idPatients = signal<any[]>([]);
  idAgent = signal<any[]>([]);
  idMaladie = signal<any[]>([]);

  // 2. L'objet lié à tes directives [(ngModel)] dans le HTML
  traitement = {
    nomTraitement: '',
    description: '',
    datedebut: null,
    datefin: null,
    id_patient: 0,       // Stockera l'id temporairement (lié à ton select HTML)
    id_maladie: 0,       // Stockera l'id temporairement (lié à ton select HTML)
    id_agent_sante: 0    // Stockera l'id temporairement (lié à ton select HTML)
  };

  // Raccourcis indispensables pour simplifier la liaison ngModel bidirectionnelle de tes inputs textuels
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

  // 3. Chargement initial des données au démarrage de l'écran
  async ngOnInit() {
    await this.chargerDonneesFormulaire();
  }

  // Récupération asynchrone des référentiels d'ID
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

  // 4. L'enregistrement final avec remappage des IDs pour le DTO Spring Boot
  onSubmit() {
    const nouveauTraitementDTO: Traitement = {
      idTraitement: 0, // Ignoré par le backend à la création
      nomTraitement: this.traitement.nomTraitement,
      description: this.traitement.description,
      datedebut: this.traitement.datedebut,
      datefin: this.traitement.datefin,
      // Conversion sécurisée en nombre des IDs issus du HTML
      idPatient: Number(this.traitement.id_patient),
      idMaladie: Number(this.traitement.id_maladie),
      idAgentSante: Number(this.traitement.id_agent_sante)
    };

    // Validation simple pour éviter d'envoyer des identifiants vides
    if (!nouveauTraitementDTO.idPatient || !nouveauTraitementDTO.idMaladie || !nouveauTraitementDTO.idAgentSante) {
      alert("Veuillez sélectionner un Patient, une Maladie et un Agent de santé valide.");
      return;
    }

    // Appel du service pour enregistrer
    this.serviceTraitement.ajouterTraitement(nouveauTraitementDTO).subscribe({
      next: (response) => {
        console.log("Traitement enregistré avec succès !", response);
        this.router.navigate(['/liste-traitement']); // Redirection
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement :", err);
      }
    });
  }

  onAnnuler() {
    this.router.navigate(['/liste-traitement']);
  }
}