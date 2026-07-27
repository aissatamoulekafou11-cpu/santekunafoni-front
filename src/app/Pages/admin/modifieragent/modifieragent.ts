import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Header } from '../../../Component/header/header';
import { SidebarComponent } from '../../sidebar-component/sidebar-component';

import { AgentSanteService } from '../../../Services/agent-sante';
import { AgentSante } from '../../../Models/agent-sante.model';

@Component({
  selector: 'app-modifieragent',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Header,
    SidebarComponent
  ],
  templateUrl: './modifieragent.html',
  styleUrl: './modifieragent.css'
})
export class Modifieragent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private agentService = inject(AgentSanteService);

  idAgent!: number;

  editAgentForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motpass: ['', Validators.required],
    specialite: ['', Validators.required],
    centre: ['', Validators.required]
  });

  ngOnInit(): void {

    this.idAgent = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!this.idAgent) {
      alert("Identifiant de l'agent introuvable.");
      this.router.navigate(['/accueil']);
      return;
    }

    this.chargerAgent();
  }

  chargerAgent(): void {

    this.agentService.getAgentById(this.idAgent).subscribe({

      next: (data: AgentSante) => {

        this.editAgentForm.patchValue({

          nom: data.nom,
          prenom: data.prenom,
          tel: data.tel,
          email: data.email,
          motpass: data.motpass,
          specialite: data.specialite,
          centre: data.centre

        });

      },

      error: (err) => {

        console.error(err);
        alert("Impossible de récupérer les informations de l'agent.");

      }

    });

  }

  enregistrer(): void {

    if (this.editAgentForm.invalid) {

      this.editAgentForm.markAllAsTouched();
      return;

    }

    const agent: AgentSante = {

      idUtilisateur: this.idAgent,

      nom: this.editAgentForm.value.nom ?? '',

      prenom: this.editAgentForm.value.prenom ?? '',

      tel: this.editAgentForm.value.tel ?? '',

      motpass: this.editAgentForm.value.motpass ?? '',

      email: this.editAgentForm.value.email ?? '',

      specialite: this.editAgentForm.value.specialite ?? '',

      centre: this.editAgentForm.value.centre ?? ''

    };

    this.agentService.modifierAgent(this.idAgent, agent)
      .subscribe({

        next: () => {

          alert("Agent modifié avec succès.");

this.router.navigate(['/agents']);
        },

        error: (err) => {

          console.error(err);

          alert("Erreur lors de la modification.");

        }

      });

  }

  annuler(): void {

this.router.navigate(['/agents']);  }

}