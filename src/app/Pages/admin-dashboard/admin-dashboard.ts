import { AfterViewInit,Component } from '@angular/core';
import * as L from 'leaflet';
import { Sidebar } from '../../Component/sidebar/sidebar';
import { Header } from '../../Component/header/header';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [Sidebar,Header],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard  implements AfterViewInit {

  // Graphe des alertes

  ngAfterViewInit(): void {

    this.initChart();

    this.initMap();
  } 

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

// Cartographie

private initMap(): void {

  const map = L.map('map').setView([17.5707, -3.9962], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    maxZoom: 18,

    attribution: '&copy; OpenStreetMap'

  }).addTo(map);

}
}

