import { Component, inject,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AgentSanteService } from '../../Services/agent-sante';
import { Header } from '../header/header';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AgentSante } from '../../Models/agent-sante.model';

@Component({
  selector: 'app-agent-sante-liste',
  imports: [Header, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agent-sante-liste.html',
  styleUrl: './agent-sante-liste.css',
})
export class AgentSanteListe {
  listAgent: AgentSante[] = []; // Un tableau vide pour stocker les agents de santé
  agent!:AgentSante;
  idAgent!: number;

  //La variable qui retient le texte tapé
  searchTerm: string = '';
  
  private agentService = inject(AgentSanteService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.toutLesAgents();
  }

  toutLesAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        //this.listAgent = data; // On stocke les agents reçus de l'API
        // L'opérateur [...] crée une copie propre et force Angular à rafraîchir le DOM
        this.listAgent = [...data];
        // console.log('Chargement effectué ! ');
        // console.log(data);
        this.cdr.detectChanges();
      },
      error: (erreur) => {
        console.error('Erreur lors du chargement', erreur);
      }
    });
  }

  addAgentForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    motpass: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

  // Fontion de filtrage
  get agentsFiltres(): AgentSante[] {
    if (!this.searchTerm.trim()) {
      return this.listAgent;
    }

    const recherche = this.searchTerm.toLowerCase();
    return this.listAgent.filter(agent =>
      agent.nom.toLowerCase().includes(recherche)||
      agent.prenom.toLowerCase().includes(recherche)||
      agent.specialite.toLowerCase().includes(recherche)
    )
  }

   ajoutAgent() {
    console.log(this.addAgentForm.value);
    this.agent = this.addAgentForm.value as AgentSante;
    this.agentService.addagent(this.agent).subscribe({
      next: (data) => {
        console.log("Ajout effectué avec succès", data);
        this.toutLesAgents();
        this.addAgentForm.reset();
      },
      error: (error) => {
        console.error("Erreur", error);
      }
    });
  }

  modifierAgent(id: number): void {
    this.router.navigate(['/modifieragent', id]);
  }

  infoAgentForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    tel: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    motpass: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

  infoAgent(id: number): void {
    this.agentService.getAgentById(id).subscribe({
      next: (data) => {
        this.infoAgentForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          tel: data.tel,
          email: data.email,
          motpass: data.motpass,
          specialite: data.specialite,
          centre: data.centre
        });
      },
      error: (erreur) => {
        console.error("Erreur lors de la récupération de l'agent", erreur);
      }
    });
  }

  //supprimer un agent de santé
  preparerSuppression(id: number): void{
    this.idAgent = id;
  }

  supprimerAgent(): void{
    if (this.idAgent) {
      this.agentService.deleteAgent(this.idAgent).subscribe({
        next:() =>  {
          console.log("Agent supprimer avec succès")
          // On laisse l'animation Bootstrap se terminer avant de rafraîchir
          // setTimeout(() => {
          //   this.toutLesAgents();
          // }, 100);

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log("Erreur lors de la suppression de l'agent", err);
      },
      });
    }
  }
}
