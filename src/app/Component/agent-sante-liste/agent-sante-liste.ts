import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AgentSanteService } from '../../Services/agent-sante';
import { Header } from '../header/header';
import { AgentSante } from '../../Models/agent-sante.model';

@Component({
  selector: 'app-agent-sante-liste',
  standalone: true,
  imports: [
    Header, 
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './agent-sante-liste.html',
  styleUrl: './agent-sante-liste.css',
})
export class AgentSanteListe implements OnInit {
  listAgent: AgentSante[] = [];
  agent!: AgentSante;
  
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
        this.listAgent = data;
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
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

  ajoutAgent(): void {
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
    telephone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    specialite: ['', [Validators.required]],
    centre: ['', [Validators.required]]
  });

  infoAgent(id: number): void {
    this.agentService.getAgentById(id).subscribe({
      next: (data) => {
        this.infoAgentForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.tel,
          email: data.email,
          password: data.motpass,
          specialite: data.specialite,
          centre: data.centre
        });
      },
      error: (erreur) => {
        console.error("Erreur lors de la récupération de l'agent", erreur);
      }
    });
  }

  supprimerAgent(id: number): void {
    this.agentService.deleteAgent(id).subscribe({
      next: () => {
        console.log("Agent supprimé avec succès");
        this.toutLesAgents();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de l'agent", err);
      }
    });
  }
}