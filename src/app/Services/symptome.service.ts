import { Injectable, signal } from '@angular/core';
import { Symptome } from '../Models/symptome.model';

@Injectable({
  providedIn: 'root'
})
export class SymptomeService {
  // On utilise un signal pour stocker la liste initiale
  symptomes = signal<Symptome[]>([
    { id: 1, nom: 'Fievre', description: 'Elevation de la temperature corporelle au-dessus de la normale.', dateCreation: '09/09/2026' },
    { id: 2, nom: 'Maux de tete', description: 'Douleur ressenti au niveau de la tête.', dateCreation: '09/09/2026' },
    { id: 3, nom: 'Fatigue', description: 'Sensation de lassitude et de manque d\'énergie.', dateCreation: '09/09/2026' },
    { id: 4, nom: 'Toux sèches', description: 'Toux sans production de mucosités.', dateCreation: '09/09/2026' },
    { id: 5, nom: 'Nausées', description: 'Sensation de malaise, envie de vomir.', dateCreation: '09/09/2026' }
  ]);

  constructor() { }
}