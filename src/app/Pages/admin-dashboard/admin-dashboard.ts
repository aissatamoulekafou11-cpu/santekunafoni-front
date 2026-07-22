import { AfterViewInit,Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Sidebar } from '../../Component/sidebar/sidebar';
import { Header } from '../../Component/header/header';
import { Chart } from 'chart.js/auto';
import { DashboardStats } from '../../Models/dashboard-stats.model';
import { AdminDashboardService } from '../../Services/admin-dashboard';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [Sidebar,Header],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard  implements OnInit, AfterViewInit {

  // stocker les compteurs de nos 3 cartes
  stats: DashboardStats={
    totalAgentsSante:0,
    totalPatients:0,
    totalAlertes: 0
  };

  // Injection du service dans le constructeur
  constructor(private dashboardService: AdminDashboardService){}


  // 1. Appel du service HTTP dès le chargement de la page
  ngOnInit():void{
    this.chargerStatistiques();
  }
  // 2. Initialisation des visuels (Graphe & Carte) une fois la vue chargée
  ngAfterViewInit(): void {
    this.initChart();
    this.initMap();
  } 

// Méthode pour récupérer les données de Spring Boot
  private chargerStatistiques(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (donnees) => {
        this.stats = donnees; // On met à jour les compteurs
      },
      error: (erreur) => {
        console.error('Erreur lors de la récupération des données du dashboard :', erreur);
      }
    });
  }
  
// Configuration du Graphique Chart.js
  private initChart():void {
    new Chart('dashboardChart', {
  type: 'line',

  data: {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],

    datasets: [
      {
        label: 'Cas enregistrés',
        data: [12, 25, 18, 32, 20, 40],
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
        beginAtZero: true
      }
    }
  }

});
}

// Configuration de la Carte Leaflet pour le Mali
private initMap(): void {

  const maliBounds = L.latLngBounds(
    [10.0, -12.5],   // Sud-Ouest du Mali
    [25.5, 4.5]      // Nord-Est du Mali
  );

  const map = L.map('map', {
    maxBounds: maliBounds,
    maxBoundsViscosity: 1.0
  }).setView([17.5707, -3.9962], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

}
}

