import { Component, OnInit, signal, ChangeDetectorRef } from '@angular/core';
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

  // L'objet réactif lié à la vue via [(ngModel)]
  traitement = {
    nomTraitement: '',
    description: '',
    datedebut: '',
    datefin: '',
    id_patient: 0,
    id_maladie: 0,
    id_agent_sante: 0
  };

  constructor(
    private serviceTraitement: ServiceTraitement,
    private route: ActivatedRoute, 
    private router: Router,
    private cdr: ChangeDetectorRef // Injecté pour forcer le rafraîchissement du composant
  ) {}

  async ngOnInit() {
    // Récupération sécurisée de l'ID depuis les paramètres de la route
    const idParam = this.route.snapshot.params['id'] || this.route.snapshot.params['idTraitement'];
    this.idTraitementActuel = Number(idParam);

    // 1. Charger d'abord les référentiels
    await this.chargerDonneesFormulaire();

    // 2. Charger ensuite le traitement à modifier
    if (this.idTraitementActuel) {
      this.chargerTraitementAModifier();
    }
  }

  async chargerDonneesFormulaire() {
    try {
      const [resPatients, resAgents, resMaladies] = await Promise.all([
        fetch('http://localhost:8080/api/patients').then(r => r.json()),
        fetch('http://localhost:8080/api/agents').then(r => r.json()),
        fetch('http://localhost:8080/api/maladies').then(r => r.json())
      ]);

      this.idPatients.set(resPatients);
      this.idAgent.set(resAgents);
      this.idMaladie.set(resMaladies);
    } catch (error) {
      console.error("Erreur lors du chargement des référentiels :", error);
    }
  }

  // Formatage propre pour les inputs de type date (YYYY-MM-DD)
  private formaterDate(valeurDate: any): string {
    if (!valeurDate) return '';
    if (typeof valeurDate === 'string' && valeurDate.includes('T')) {
      return valeurDate.split('T')[0];
    }
    const d = new Date(valeurDate);
    return !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : String(valeurDate);
  }

  chargerTraitementAModifier() {
    this.serviceTraitement.getTraitementById(this.idTraitementActuel).subscribe({
      next: (data: any) => {
        console.log("Données reçues du backend :", data);

        // Remplissage progressif sans rompre la référence mémoire
        this.traitement.nomTraitement = data.nomTraitement || data.nom || '';
        this.traitement.description = data.description || '';
        this.traitement.datedebut = this.formaterDate(data.datedebut || data.date_debut);
        this.traitement.datefin = this.formaterDate(data.datefin || data.date_fin);
        
        // Sécurisation des IDs (compatible avec objet imbriqué ou simple ID)
        this.traitement.id_patient = Number(data.idPatient || data.id_patient || (data.patient ? data.patient.idUtilisateur : 0));
        this.traitement.id_maladie = Number(data.idMaladie || data.id_maladie || (data.maladie ? data.maladie.idMaladie : 0));
        this.traitement.id_agent_sante = Number(data.idAgentSante || data.id_agent_sante || (data.agentSante ? data.agentSante.idUtilisateur : 0));

        // Met à jour l'interface immédiatement
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Impossible de charger le traitement :", err)
    });
  }

onSubmit() {
  const traitementModifieDTO = {
    idTraitement: this.idTraitementActuel,
    nomTraitement: this.traitement.nomTraitement,
    description: this.traitement.description,
    
    // Envoi sous forme de chaîne YYYY-MM-DD directe ou null
    datedebut: this.traitement.datedebut || null,
    datefin: this.traitement.datefin || null,
    
    idPatient: Number(this.traitement.id_patient),
    idMaladie: Number(this.traitement.id_maladie),
    idAgentSante: Number(this.traitement.id_agent_sante)
  };

  console.log("Payload envoyé au backend :", traitementModifieDTO);

  this.serviceTraitement.modifierTraitement(this.idTraitementActuel, traitementModifieDTO as any).subscribe({
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