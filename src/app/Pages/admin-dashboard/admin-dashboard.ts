import { AfterViewInit,ChangeDetectorRef,Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Header } from '../../Component/header/header';
import { Chart } from 'chart.js/auto';
import { DashboardStats, ChartDataDTO } from '../../Models/dashboard-stats.model';
import { AdminDashboardService } from '../../Services/admin-dashboard';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [Header],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard  implements OnInit, AfterViewInit {
    
  //Stocker la référence de l'instance Chart.js
  private alertChart!: Chart;

  // stocker les compteurs de nos 3 cartes
  stats: DashboardStats={
    totalAgentsSante:0,
    totalPatients:0,
    totalNotifications: 0,
  };

  // Injection du service dans le constructeur
  constructor(
    private dashboardService: AdminDashboardService,
    private cdr : ChangeDetectorRef
  ){}


  // 1. Appel du service HTTP dès le chargement de la page
  ngOnInit():void{
    console.log('--- ngOnInit exécuté ---');
    this.chargerStatistiques();
  }
  // 2. Initialisation des visuels (Graphe & Carte) une fois la vue chargée
  ngAfterViewInit(): void {
    this.initGrapheAlertes();
    this.initMap();
  } 

// Méthode pour récupérer les données de Spring Boot
// Création de  chargerStatistiques()
  private chargerStatistiques(): void {
    console.log('--- Lancement de la requête HTTP ---');
    this.dashboardService.getDashboardStats().subscribe({
      next: (donnees) => {
        console.log('--- Données reçues du Backend :', donnees);
        this.stats = donnees; 
      
       // 3. Si Spring Boot envoie les données du graphe, on les injecte
       if (donnees && donnees.grapheAlertes) {
          this.mettreAJourGrapheAlertes(donnees.grapheAlertes);
        }

        this.cdr.detectChanges();
      },
      error: (erreur) => {
        console.error('Erreur lors de la récupération des données du dashboard :', erreur);
      }
    });
  }
  
// Configuration du Graphique Chart.js
// Création de initGrapheAltertes
  private initGrapheAlertes(): void {
    this.alertChart = new Chart('dashboardChart', {
      type: 'pie',
      data: {
        labels: [], // Initialement vide
        datasets: [
          {
            label: 'Alertes enregistrées',
            data: [], // Initialement vide
           backgroundColor: '#174B45',
        borderColor: '#0F3632',
        borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 // Affiche des entiers (pas de demi-alertes)
            }
          }
        }
      }
    });
  }

  // Mise à jour des données du graphique à la réception de la réponse HTTP
  private mettreAJourGrapheAlertes(grapheData: ChartDataDTO): void {
    if (this.alertChart) {
      this.alertChart.data.labels = grapheData.labels;
      this.alertChart.data.datasets[0].data = grapheData.donnees;
      this.alertChart.update(); // Redessine le graphique avec une animation fluide
    }else {
    console.warn('alertChart n\'est pas encore initialisé !');
  }
  }


// Configuration de la Carte Leaflet pour le Mali
private initMap(): void {

  const maliBounds = L.latLngBounds(
    [10, -12.5],   // Sud-Ouest du Mali
    [25.5, 4.5]      // Nord-Est du Mali
  );

  const map = L.map('map', {
    maxBounds: maliBounds,
    maxBoundsViscosity: 0.5,
     minZoom: 4
  }).setView([17.5707, -3.9962], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

}
}