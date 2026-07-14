import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentSante } from '../Models/agent-sante.model';

@Injectable({
    providedIn: 'root' // Ici c'est pour dire à angular que ce service est disponible partout dans l'application
})
export class AgentSanteService {
    // On injecte le client HTTP d'Angular pour pouvoir faire des requêtes 
    private http = inject(HttpClient);

    // L'URL de l'API Spring Boot (on cible le controlleur des agents de santé)
    private apiUrl = 'http://localhost:8080/api/agents';

    // Fonction pour ajouter un agent de santé avec la methodes POST
    addagent(infosAgent: AgentSante): Observable<any>{
        return this.http.post(`${this.apiUrl}`, infosAgent);
    }

    // Fonction pour afficher tout les agents de santé
    getAllAgents(): Observable<any[]>{
        return this.http.get<any[]>(this.apiUrl);
    }

    // Fonction pour afficher un agent à travers son id
    getAgentById(id: number): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    // Fonction pour supprimer un agent de santé
    deleteAgent(id: number): Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
