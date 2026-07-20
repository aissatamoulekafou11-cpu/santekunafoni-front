import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { AgentSanteService } from '../../Services/agent-sante';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentSante } from '../../Models/agent-sante.model';

@Component({
  selector: 'app-agent-sante-liste',
  imports: [Header, CommonModule, Sidebar, ReactiveFormsModule],
  templateUrl: './agent-sante-liste.html',
  styleUrl: './agent-sante-liste.css',
})
export class AgentSanteListe {
  listAgent: AgentSante[] = []; // Un tableau vide pour stocker les agents de santé
  agent!:AgentSante
  
  // Injection du service AgentSanteService
  private agentService = inject(AgentSanteService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  // Pour afficher la liste des agents aucune action n'est nécessaire on grâce à la methode ngOnInit() la liste est chargée automatiquement
  ngOnInit(): void {
    this.toutLesAgents();
  }

  // La fonction qui va chercher la liste des agents de santé auprès de l'API
  toutLesAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.listAgent = data; // On stocke les agents reçus de l'API
        // console.log('Chargement effectué ! ');
        // console.log(data);
        this.cdr.detectChanges();
      },
      error: (erreur) => {
        console.error('Erreur lors du chargement', erreur);
      }
    })
  }



  addAgentForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

   ajoutAgent() {
    console.log(this.addAgentForm.value);
    this.agent = this.addAgentForm.value as AgentSante;
    
    // console.log("*********************",this.agent);

    this.agentService.addagent(this.agent).subscribe(
      {
        next: (data)=>{
          console.log("ajout effectuer avec succes",data);
          this.toutLesAgents();
            this.addAgentForm.reset();
        },
        error: (error)=>{
          console.log("Erreur",error);

        }
      }
    )

  }

  //modifier un agent de santé
  editAgentForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

  modifAgent(){}

  // Infos d'un agent de santé
  infoAgentForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

  // Recuperer les infos d'un agent 
  infoAgent(id: number): void{
    this.agentService.getAgentById(id).subscribe({
      next: (data) => {
        this.infoAgentForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.tel,
          email: data.email,
          password: data.motpass,
          specialite: data.specialite,
          centre:data.centre
        });
      },
      error: (erreur) => {
        console.error("Erreur lors de la récuperation de l'agent", erreur);
      }
    });
  }

  //supprimer un agent de santé
  supprimerAgent(id: number): void{
    this.agentService.deleteAgent(id).subscribe({
      next:() =>  {
        console.log("Agent supprimer avec succès")
        this.toutLesAgents();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log("Erreur lors de la suppression de l'agent", err)
      },
    });
  }
}

// this.listAgent = [...data]; // L'opérateur [...] force Angular à recréer la référence du tableau