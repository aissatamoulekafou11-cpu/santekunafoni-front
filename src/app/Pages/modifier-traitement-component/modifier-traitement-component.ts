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

  idTraitementActuel!: number;

  // Listes déroulantes (Signals)
  idPatients = signal<any[]>([]);
  idAgent = signal<any[]>([]);
  idMaladie = signal<any[]>([]);

  // L'objet unique sur lequel TOUT le HTML pointe via [(ngModel)]
  traitement = {
    nomTraitement: '',
    description: '',
    datedebut: '', // String pour correspondre au format de l'input type="date"
    datefin: '',   // String pour correspondre au format de l'input type="date"
    id_patient: 0,
    id_maladie: 0,
    id_agent_sante: 0
  };

  constructor(
    private serviceTraitement: ServiceTraitement,
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  async ngOnInit() {
    this.idTraitementActuel = Number(this.route.snapshot.params['id']);

    // 1. Charger d'abord les listes des selects
    await this.chargerDonneesFormulaire();

    // 2. Charger ensuite le traitement et pré-remplir l'objet
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
        console.log("Données brutes reçues du backend :", data);

        // Formatage obligatoire des dates pour l'affichage dans <input type="date">
        let dateDebFormatee = '';
        let dateFinFormatee = '';

        if (data.datedebut || data.date_debut) {
          dateDebFormatee = new Date(data.datedebut || data.date_debut).toISOString().split('T')[0];
        }
        if (data.datefin || data.date_fin) {
          dateFinFormatee = new Date(data.datefin || data.date_fin).toISOString().split('T')[0];
        }

        // Affectation finale : c'est CETTE étape qui remplit instantanément ton HTML
        this.traitement = {
          nomTraitement: data.nomTraitement || data.nom || '',
          description: data.description || '',
          datedebut: dateDebFormatee,
          datefin: dateFinFormatee,
          id_patient: data.idPatient || data.id_patient || 0,
          id_maladie: data.idMaladie || data.id_maladie || 0,
          id_agent_sante: data.idAgentSante || data.id_agent_sante || 0
        };
      },
      error: (err) => console.error("Impossible de charger le traitement :", err)
    });
  }

  onSubmit() {
    // Reconstruction du DTO attendu par ton API Spring Boot
    const traitementModifieDTO: Traitement = {
      idTraitement: this.idTraitementActuel,
      nomTraitement: this.traitement.nomTraitement,
      description: this.traitement.description,
      datedebut: this.traitement.datedebut ? new Date(this.traitement.datedebut) : null,
      datefin: this.traitement.datefin ? new Date(this.traitement.datefin) : null,
      idPatient: Number(this.traitement.id_patient),
      idMaladie: Number(this.traitement.id_maladie),
      idAgentSante: Number(this.traitement.id_agent_sante)
    };

    this.serviceTraitement.modifierTraitement(this.idTraitementActuel, traitementModifieDTO).subscribe({
      next: () => {
        alert("Traitement modifié avec succès !");
        this.router.navigate(['/liste-traitement']);
      },
      error: (err) => console.error("Erreur lors de la modification :", err)
    });
  }

  onAnnuler() {
    this.router.navigate(['/liste-traitement']);
  }
}