import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Import du module FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Import des icônes nécessaires
import { 
  faBell, 
  faTriangleExclamation, 
  faEnvelope, 
  faCheck, 
  faPlus, 
  faMagnifyingGlass, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

import { NotificationService } from '../../../Services/notification.service';
import { Notification } from '../../../Models/notification.model';
import { Sidebar } from "../../../Component/sidebar/sidebar";

@Component({
  selector: 'app-list-notifications',
  standalone: true,
  // Ajout de FontAwesomeModule aux imports
  imports: [CommonModule, FormsModule, FontAwesomeModule, Sidebar],
  templateUrl: './list-notifications.html',
  styleUrls: ['./list-notifications.css']
})
export class ListNotificationsComponent implements OnInit {

  // Déclaration des icônes pour le HTML
  faBell = faBell;
  faTriangleExclamation = faTriangleExclamation;
  faEnvelope = faEnvelope;
  faCheck = faCheck;
  faPlus = faPlus;
  faMagnifyingGlass = faMagnifyingGlass;
  faClock = faClock;

  // ── Données ─────────────────────────────────────────
  notifications: Notification[] = [];
  notificationsFiltrees: Notification[] = [];

  // ── États UI ────────────────────────────────────────
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // ── Nouvelle notification ordinaire ─────────────────
  showFormulaire = false;
  nouvelleNotification: Notification = {
    titre: '',
    message: '',
    lue: false,
    utilisateur: { idUtilisateur: 1 }
  };

  // ── Alerte épidémie ─────────────────────────────────
  idMaladieVerif = 1;
  showVerifEpidemie = false;

  // ── Filtre ──────────────────────────────────────────
  filtreTexte = '';
  filtreLue = 'toutes';

  // ── Pagination ──────────────────────────────────────
  pageActuelle = 1;
  parPage = 5;

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {
    this.chargerNotifications();
  }

  // ── Chargement ──────────────────────────────────────
  chargerNotifications(): void {
    this.isLoading = true;
    this.notifService.getAllNotifications().subscribe({
      next: (data) => {
        this.notifications = data;
        this.appliquerFiltres();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les notifications.';
        this.isLoading = false;
      }
    });
  }

  // ── Filtres ─────────────────────────────────────────
  appliquerFiltres(): void {
    let result = [...this.notifications];

    if (this.filtreTexte.trim()) {
      const texte = this.filtreTexte.toLowerCase();
      result = result.filter(n =>
        n.titre.toLowerCase().includes(texte) ||
        n.message.toLowerCase().includes(texte)
      );
    }

    if (this.filtreLue === 'lues') {
      result = result.filter(n => n.lue);
    } else if (this.filtreLue === 'non-lues') {
      result = result.filter(n => !n.lue);
    }

    this.notificationsFiltrees = result;
    this.pageActuelle = 1;
  }

  // ── Pagination ──────────────────────────────────────
  get notificationsPaginees(): Notification[] {
    const debut = (this.pageActuelle - 1) * this.parPage;
    return this.notificationsFiltrees.slice(debut, debut + this.parPage);
  }

  get totalPages(): number {
    return Math.ceil(this.notificationsFiltrees.length / this.parPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageActuelle = page;
    }
  }

  // ── Compteurs ───────────────────────────────────────
  get nombreNonLues(): number {
    return this.notifications.filter(n => !n.lue).length;
  }

  get nombreAlertes(): number {
    return this.notifications.filter(n =>
      n.titre?.toLowerCase().includes('épidémie') ||
      n.titre?.toLowerCase().includes('alerte')
    ).length;
  }

  // ── Actions ─────────────────────────────────────────
  toggleFormulaire(): void {
    this.showFormulaire = !this.showFormulaire;
  }

  toggleVerifEpidemie(): void {
    this.showVerifEpidemie = !this.showVerifEpidemie;
  }

  estAlerte(notif: Notification): boolean {
    return notif.titre?.toLowerCase().includes('épidémie') ||
           notif.titre?.toLowerCase().includes('alerte') || false;
  }

  marquerLue(id: number): void {
    this.notifService.marquerCommeLue(id).subscribe({
      next: () => {
        this.afficherSucces('Notification marquée comme lue.');
        this.chargerNotifications();
      }
    });
  }

  envoyerNotification(): void {
    this.notifService.envoyerNotification(this.nouvelleNotification).subscribe({
      next: () => {
        this.afficherSucces('Notification envoyée !');
        this.showFormulaire = false;
        this.chargerNotifications();
      }
    });
  }

  verifierEpidemie(): void {
    this.notifService.verifierEpidemie(this.idMaladieVerif).subscribe({
      next: (msg) => {
        this.afficherSucces(msg);
        this.showVerifEpidemie = false;
        this.chargerNotifications();
      }
    });
  }

  afficherSucces(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 4000);
  }
}