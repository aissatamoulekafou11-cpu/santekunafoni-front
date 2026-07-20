import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faTriangleExclamation,
  faPlus,
  faCheck,
  faEnvelope,
  faMagnifyingGlass,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../../Services/notification.service';
import { Notification } from '../../../Models/notification.model';
import { Sidebar } from "../../../Component/sidebar/sidebar";

@Component({
  selector: 'app-list-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, Sidebar],
  templateUrl: './list-notifications.html',
  styleUrl: './list-notifications.css'
})
export class ListNotificationsComponent implements OnInit {

  faBell = faBell;
  faTriangleExclamation = faTriangleExclamation;
  faPlus = faPlus;
  faCheck = faCheck;
  faEnvelope = faEnvelope;
  faMagnifyingGlass = faMagnifyingGlass;
  faClock = faClock;

  notifications: Notification[] = [];
  notificationsFiltrees: Notification[] = [];
  notificationsPaginees: Notification[] = [];

  nombreNonLues = 0;
  nombreAlertes = 0;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  showFormulaire = false;
  showVerifEpidemie = false;
  idMaladieVerif = 1;

  nouvelleNotification: Partial<Notification> = {
    titre: '',
    message: ''
  };

  filtreTexte = '';
  filtreLue = 'toutes';
  pageActuelle = 1;
  taillePage = 5;
  totalPages = 1;
  pages: number[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.chargerNotifications();
  }

  chargerNotifications(): void {
    this.isLoading = true;
    this.notificationService.getAllNotifications().subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        this.appliquerFiltres();
        this.mettreAJourStatistiques();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les notifications.';
        this.isLoading = false;
      }
    });
  }

  mettreAJourStatistiques(): void {
    this.nombreNonLues = this.notifications.filter(n => !n.lue).length;
    this.nombreAlertes = this.notifications.filter(n => this.estAlerte(n)).length;
  }

  appliquerFiltres(): void {
    this.notificationsFiltrees = this.notifications.filter(n => {
      const correspondTexte = !this.filtreTexte ||
        n.titre.toLowerCase().includes(this.filtreTexte.toLowerCase()) ||
        n.message.toLowerCase().includes(this.filtreTexte.toLowerCase());

      const correspondStatut = this.filtreLue === 'toutes' ||
        (this.filtreLue === 'lues' && n.lue) ||
        (this.filtreLue === 'non-lues' && !n.lue);

      return correspondTexte && correspondStatut;
    });

    this.pageActuelle = 1;
    this.calculerPagination();
  }

  calculerPagination(): void {
    this.totalPages = Math.ceil(this.notificationsFiltrees.length / this.taillePage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.mettreAJourPage();
  }

  mettreAJourPage(): void {
    const debut = (this.pageActuelle - 1) * this.taillePage;
    this.notificationsPaginees = this.notificationsFiltrees.slice(debut, debut + this.taillePage);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageActuelle = page;
      this.mettreAJourPage();
    }
  }

  toggleFormulaire(): void {
    this.showFormulaire = !this.showFormulaire;
    if (this.showFormulaire) this.showVerifEpidemie = false;
    this.errorMessage = '';
  }

  toggleVerifEpidemie(): void {
    this.showVerifEpidemie = !this.showVerifEpidemie;
    if (this.showVerifEpidemie) this.showFormulaire = false;
  }

  envoyerNotification(): void {
    if (!this.nouvelleNotification.titre || !this.nouvelleNotification.message) {
      this.errorMessage = 'Le titre et le message sont obligatoires.';
      return;
    }

    this.isLoading = true;
    this.notificationService.envoyerNotification(this.nouvelleNotification as Notification).subscribe({
      next: (nouvelle: Notification) => {
        this.notifications.unshift(nouvelle);
        this.appliquerFiltres();
        this.mettreAJourStatistiques();
        this.successMessage = 'Notification envoyee avec succes !';
        this.nouvelleNotification = { titre: '', message: '' };
        this.showFormulaire = false;
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l envoi. Verifiez que le serveur est accessible.';
        this.isLoading = false;
      }
    });
  }

  verifierEpidemie(): void {
    this.isLoading = true;
    this.notificationService.verifierEpidemie(this.idMaladieVerif).subscribe({
      next: (msg: string) => {
        this.successMessage = msg || 'Verification effectuee. Aucune alerte.';
        this.chargerNotifications();
        this.showVerifEpidemie = false;
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la verification epidemie.';
        this.isLoading = false;
      }
    });
  }

  marquerLue(id: number): void {
    this.notificationService.marquerCommeLue(id).subscribe({
      next: () => {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
          this.notifications[index].lue = true;
          this.appliquerFiltres();
          this.mettreAJourStatistiques();
        }
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la mise a jour.';
      }
    });
  }

  estAlerte(notif: Notification): boolean {
    return notif.titre.toLowerCase().includes('alerte') ||
           notif.message.toLowerCase().includes('epidemie') ||
           notif.message.toLowerCase().includes('urgent');
  }
}