import { Component, inject, OnInit } from '@angular/core';
import { AgentSanteService } from '../../Services/agent-sante';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-agent-sante-liste',
  imports: [Header, CommonModule, Sidebar],
  templateUrl: './agent-sante-liste.html',
  styleUrl: './agent-sante-liste.css',
})
export class AgentSanteListe {
  listAgent: any[] = []; // Un tableau vide pour stocker les agents de santé

  // Injection du service AgentSanteService
  private agentService = inject(AgentSanteService);

  // Pour afficher la liste des agents aucune action n'est nécessaire on grâce à la methode ngOnInit() la liste est chargée automatiquement
  ngOnInit(): void {
    this.toutLesAgents();
  }

  // La fonction qui va chercher la liste des agents de santé auprès de l'API
  toutLesAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data) => {
        this.listAgent = data; // On stocke les agents reçus de l'API
        console.log('Chargement effectué ! ');
      },
      error: (erreur) => {
        console.error('Erreur lors du chargement', erreur);
      }
    })
  }

}
