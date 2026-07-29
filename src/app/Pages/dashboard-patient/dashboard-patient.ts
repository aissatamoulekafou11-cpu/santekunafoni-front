// import Chart from 'chart.js/auto';
import { Component, AfterViewInit, OnInit, ElementRef, ViewChild, ChangeDetectorRef, inject } from '@angular/core';
import Chart from 'chart.js/auto';
// import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { AuthService } from '../../Services/auth';
import { PatientService } from '../../Services/patient'; 
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { Maladie } from '../../Models/maladie.model';
import { TraitementAffichage } from '../../Models/traitement.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard-patient',
  imports: [SidebarComponent, RouterLink],
  templateUrl: './dashboard-patient.html',
  styleUrl: './dashboard-patient.css'
})
export class DashboardPatient implements OnInit, AfterViewInit {
  private authService = inject(AuthService);
  private patientService = inject(PatientService);
  private traitementService = inject(ServiceTraitement);
  private cdr = inject(ChangeDetectorRef);

  utilisateur = { prenom: 'Awa', region: 'Bamako' };
  dateDuJour = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  nbMaladies = 0;
  nbTraitements = 0;
  initiales = 'AD';

  // NOUVEAU : stocke la liste réelle pour les modals
  maladiesPatient: Maladie[] = [];
  traitementsPatient: TraitementAffichage[] = [];

  // NOUVEAU : état d'ouverture des modals
  modalOuvert: 'maladies' | 'traitements' | null = null;

  villes = [
    { nom: 'Bamako',   x: 38, y: 68, couleur: '#E8862D', taille: 14 },
    { nom: 'Ségou',    x: 55, y: 42, couleur: '#D63031', taille: 16 },
    { nom: 'Koutiala', x: 66, y: 78, couleur: '#D63031', taille: 14 },
    { nom: 'Niono',    x: 60, y: 18, couleur: '#F1C40F', taille: 12 },
    { nom: 'Mopti',    x: 78, y: 8,  couleur: '#F1C40F', taille: 12 },
  ];

  @ViewChild('graphEpidemies') graphEpidemies!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    new Chart(this.graphEpidemies.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Sikasso', 'Ségou', 'Koulikoro', 'Kayes', 'Mopti', 'Bamako'],
        datasets: [
          { label: 'Paludisme', data: [4200, 3800, 2900, 2600, 2400, 2100], backgroundColor: '#2E6FDB' },
          { label: 'Choléra',   data: [800, 1300, 700, 900, 1100, 600],     backgroundColor: '#27AE60' },
          { label: 'Rougeole',  data: [400, 500, 350, 300, 450, 380],       backgroundColor: '#F1C40F' },
          { label: 'Méningite', data: [900, 700, 500, 600, 400, 850],       backgroundColor: '#D63031' },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 10 } } } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
  ngOnInit() {
    const user = this.authService.getUtilisateurConnecte();
    console.log('Utilisateur trouvé dans localStorage :', user);

    if (!user) {
      console.warn('Aucun utilisateur connecté trouvé dans localStorage.');
      return;
    }

    const id = user.idUtilisateur ?? user.id ?? user.idPatient ?? user.patientId;

    if (!id) {
      console.warn('Aucun ID reconnu dans l\'objet utilisateur :', user);
      return;
    }

   this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        console.log('Patient chargé :', patient);
        this.nbMaladies = patient.maladies?.length ?? 0;
        this.maladiesPatient = patient.maladies ?? [];
        this.utilisateur = {
          prenom: patient.prenom,
          region: patient.localite
        };
        this.initiales = this.genererInitiales(patient.prenom, patient.nom);
        this.cdr.detectChanges();

        this.traitementService.getAllTraitementsAvecRelations().subscribe({
          next: (traitements) => {
            this.traitementsPatient = traitements.filter(
              t => t.patient?.idUtilisateur === id
            );
            this.nbTraitements = this.traitementsPatient.length;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Erreur chargement traitements :', err)
        });
      },
      error: (err) => console.error('Erreur chargement patient connecté :', err)
    });
  }

  /** NOUVEAU : construit les initiales (prénom + nom) du patient connecté */
  private genererInitiales(prenom: string, nom: string): string {
    const p = prenom?.charAt(0)?.toUpperCase() ?? '';
    const n = nom?.charAt(0)?.toUpperCase() ?? '';
    return (p + n) || 'AD';
  }

  /** NOUVEAU : ouvre le modal listant les maladies */
  ouvrirMaladiesModal() {
    this.modalOuvert = 'maladies';
  }

  /** NOUVEAU : ouvre le modal listant les traitements */
  ouvrirTraitementsModal() {
    this.modalOuvert = 'traitements';
  }

  /** NOUVEAU : ferme n'importe quel modal ouvert */
  fermerModal() {
    this.modalOuvert = null;
  }

 ngAfterViewInit() {
    new Chart(this.graphEpidemies.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Sikasso', 'Ségou', 'Koulikoro', 'Kayes', 'Mopti', 'Bamako'],
        datasets: [
          {
            label: 'Cas totaux',
            data: [6300, 6300, 4450, 4400, 4350, 3930],
            backgroundColor: ['#2E6FDB', '#27AE60', '#F1C40F', '#D63031', '#9B59B6', '#E8862D']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 } } } }
         scales: { y: { beginAtZero: true } }
      }
    });
  }
}