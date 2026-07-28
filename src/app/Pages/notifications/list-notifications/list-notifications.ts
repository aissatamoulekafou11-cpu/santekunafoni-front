import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
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
  faClock,
  faRotateRight,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../../Services/notification.service';
import { Notification, NotificationRequestDto } from '../../../Models/notification.model';
import { Sidebar } from "../../../Component/sidebar/sidebar";

@Component({
  selector: 'app-list-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './list-notifications.html',
  styleUrl: './list-notifications.css'
})
export class ListNotificationsComponent implements OnInit, OnDestroy {

  // ==================== ICÔNES ====================
  faBell = faBell;
  faTriangleExclamation = faTriangleExclamation;
  faPlus = faPlus;
  faCheck = faCheck;
  faEnvelope = faEnvelope;
  faMagnifyingGlass = faMagnifyingGlass;
  faClock = faClock;
  faRotateRight = faRotateRight;
  faXmark = faXmark;

  // ==================== INJECTIONS ====================
  private cdr = inject(ChangeDetectorRef);
  private intervalId: any;  // Pour stocker l'intervalle

  // ==================== DONNÉES ====================
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

  nouvelleNotification: NotificationRequestDto = {
    titre: '',
    message: ''
  };

  filtreTexte = '';
  filtreLue = 'toutes';
  pageActuelle = 1;
  taillePage = 5;
  totalPages = 1;
  pages: number[] = [];

  // ==================== CONSTRUCTEUR ====================
  constructor(private notificationService: NotificationService) {}

  // ==================== INIT ====================
  ngOnInit(): void {
    this.chargerNotifications();
    
    // POLLING AUTOMATIQUE toutes les 10 secondes
    this.intervalId = setInterval(() => {
      this.chargerNotificationsSilencieusement();
    }, 10000);  // 10 secondes
  }

  // ==================== DESTRUCTION ====================
  ngOnDestroy(): void {
    // Nettoyer l'intervalle pour éviter les fuites mémoire
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // ==================== CHARGEMENT (AVEC SPINNER) ====================
  chargerNotifications(): void {
    this.isLoading = true;
    this.notificationService.getAllNotifications().subscribe({
      next: (data: Notification[]) => {
        this.notifications = this.trierNotifications(data);
        this.appliquerFiltres();
        this.mettreAJourStatistiques();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les notifications.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ==================== CHARGEMENT SILENCIEUX (SANS SPINNER) ====================
  chargerNotificationsSilencieusement(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (data: Notification[]) => {
        const ancienNombre = this.notifications.length;
        const anciennesNonLues = this.nombreNonLues;

        this.notifications = this.trierNotifications(data);
        this.appliquerFiltres();
        this.mettreAJourStatistiques();
        this.cdr.detectChanges();

        // Détecter les NOUVELLES notifications
        const nouveauNombre = this.notifications.length;
        const nouvellesNonLues = this.nombreNonLues;

        if (nouveauNombre > ancienNombre) {
          const nouvelles = nouveauNombre - ancienNombre;
          this.successMessage = `${nouvelles} nouvelle(s) notification(s) reçue(s) !`;
          setTimeout(() => this.successMessage = '', 4000);
        }

        if (nouvellesNonLues > anciennesNonLues) {
          // Une nouvelle alerte non lue est arrivée !
          this.successMessage = 'Nouvelle alerte épidémie détectée !';
          setTimeout(() => this.successMessage = '', 5000);
        }
      },
      error: () => {
        // Erreur silencieuse pour le polling
        console.debug('Polling des notifications : erreur');
      }
    });
  }

  // ==================== TRI DES NOTIFICATIONS ====================
  trierNotifications(data: Notification[]): Notification[] {
    return data.sort((a, b) => {
      const dateA = a.datePublication ? new Date(a.datePublication).getTime() : 0;
      const dateB = b.datePublication ? new Date(b.datePublication).getTime() : 0;
      return dateB - dateA;  // Plus récente en premier
    });
  }

  // ==================== STATISTIQUES ====================
  mettreAJourStatistiques(): void {
    this.nombreNonLues = this.notifications.filter(n => !n.lue).length;
    this.nombreAlertes = this.notifications.filter(n => this.estAlerte(n)).length;
  }

  // ==================== FILTRES ====================
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

  // ==================== PAGINATION ====================
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

  // ==================== FORMULAIRES ====================
  toggleFormulaire(): void {
    this.showFormulaire = !this.showFormulaire;
    if (this.showFormulaire) this.showVerifEpidemie = false;
    this.errorMessage = '';
  }

  toggleVerifEpidemie(): void {
    this.showVerifEpidemie = !this.showVerifEpidemie;
    if (this.showVerifEpidemie) this.showFormulaire = false;
  }

  // ==================== ENVOYER UNE NOTIFICATION ====================
  envoyerNotification(): void {
    if (!this.nouvelleNotification.titre || !this.nouvelleNotification.message) {
      this.errorMessage = 'Le titre et le message sont obligatoires.';
      return;
    }

    this.isLoading = true;
    this.notificationService.envoyerNotification(this.nouvelleNotification).subscribe({
      next: () => {
        this.chargerNotifications();
        this.successMessage = 'Notification envoyée avec succès !';
        this.nouvelleNotification = { titre: '', message: '' };
        this.showFormulaire = false;
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi:', err);
        this.errorMessage = 'Erreur lors de l\'envoi. Vérifiez que le serveur est accessible.';
        this.isLoading = false;
      }
    });
  }

  // ==================== SUPPRIMER UNE NOTIFICATION ====================
  supprimerNotification(id: number, titre: string): void {
    // Confirmation avant suppression
    if (confirm(`Voulez-vous vraiment supprimer la notification "${titre}" ?`)) {
      
      this.notificationService.supprimerNotification(id).subscribe({
        next: () => {
          // Retirer la notification de la liste locale
          this.notifications = this.notifications.filter(n => n.id !== id);
          this.appliquerFiltres();
          this.mettreAJourStatistiques();
          this.successMessage = 'Notification supprimée avec succès !';
          this.cdr.detectChanges();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.errorMessage = 'Erreur lors de la suppression. Vérifiez que le serveur est accessible.';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  // ==================== VÉRIFICATION ÉPIDÉMIE ====================
  verifierEpidemie(): void {
    this.isLoading = true;
    this.notificationService.verifierEpidemie(this.idMaladieVerif).subscribe({
      next: (msg: string) => {
        this.successMessage = msg || 'Vérification effectuée. Aucune alerte.';
        this.chargerNotifications();
        this.showVerifEpidemie = false;
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la vérification épidémie.';
        this.isLoading = false;
      }
    });
  }

  // ==================== MARQUER COMME LUE ====================
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
        this.errorMessage = 'Erreur lors de la mise à jour.';
      }
    });
  }

  // ==================== UTILITAIRES ====================
  estAlerte(notif: Notification): boolean {
    return notif.titre.toLowerCase().includes('alerte') ||
           notif.message.toLowerCase().includes('epidemie') ||
           notif.message.toLowerCase().includes('urgent');
  }

  // ==================== RAFRAÎCHIR MANUEL ====================
  rafraichir(): void {
    this.chargerNotifications();
    this.successMessage = 'Notifications rafraîchies !';
    setTimeout(() => this.successMessage = '', 2000);
  }
}