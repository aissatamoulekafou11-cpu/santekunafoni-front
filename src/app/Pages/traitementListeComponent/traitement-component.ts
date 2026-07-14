import { Component, OnInit, signal } from '@angular/core'; // 👈 On importe 'signal'
import { Router, RouterLink } from '@angular/router';
import { Traitement } from '../../Models/traitement.model';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';

@Component({
  selector: 'app-traitement',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './traitement-component.html',
  styleUrl: './traitement-component.css',
})
export class ListeTraitement implements OnInit {
  // On transforme la variable en un Signal Angular
  traitements = signal<Traitement[]>([]);

  constructor(
    private serviceTraitement: ServiceTraitement,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTraitement();
  }

  loadTraitement() {
    this.serviceTraitement.getAllTraitement().subscribe({
      next: (donnees) => {
        console.log("Données reçues :", donnees);
        // On met à jour le signal avec la nouvelle valeur
        this.traitements.set(donnees);
      },
      error: (err) => {
        console.error("Erreur d'appel API :", err);
      }
    });
  }
}
