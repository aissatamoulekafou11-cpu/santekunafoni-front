import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient, EtatPatient } from '../../Models/patient';
import { PatientService } from '../../Services/patient';
import { MaladieService } from '../../Services/maladie.service';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { TraitementAffichage } from '../../Models/traitement.model';
import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-list-patients',
  imports: [FormsModule, SidebarComponent],
  templateUrl: './list-patients.html',
  styleUrl: './list-patients.css'
})
export class ListPatients implements OnInit {
  private patientService = inject(PatientService);
  maladieService = inject(MaladieService);
  traitementService = inject(ServiceTraitement);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  recherche = '';
  etatsDisponibles: EtatPatient[] = ['Stable', 'Instable', 'Critique', 'Grave'];

  modalOuvert: 'ajouter' | 'details' | 'modifier' | null = null;
  patientSelectionne: Patient | null = null;
  formulaire: Patient = this.formulaireVide();

  // ═══ Les 3 états en SIGNALS (notifient l'écran automatiquement) ═══
  listePatients = signal<Patient[]>([]);
  traitements = signal<TraitementAffichage[]>([]);
  traitementsChoisis: Record<number, number | null> = {};
  chargement = signal(false);
  erreur = signal('');
  // ═══ NOUVEAU : la copie locale + les états d'attente ═══
                  
  ngOnInit() {
    this.chargerPatients();
    this.maladieService.getMaladies();
    this.chargerTraitements();
  }

  chargerTraitements() {
    this.traitementService.getAllTraitementsAvecRelations().subscribe({
      next: (data) => this.traitements.set(data),
      error: (err) => console.error('Erreur chargement traitements :', err)
    });
  }
  chargerPatients() {
    this.chargement.set(true);
    this.erreur.set('');
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.listePatients.set(data);
        this.chargement.set(false);     // ← éteint le spinner, l'écran suit tout seul
        
      },
      error: (err) => {
        console.error('Erreur API :', err);
        this.erreur.set('Impossible de charger les patients. Le serveur Spring est-il démarré ?');
        this.chargement.set(false);
      }
    });
  }

  get patients(): Patient[] {
    const terme = this.recherche.toLowerCase().trim();
    if (!terme) return this.listePatients();
    return this.listePatients().filter(p =>
      p.nom.toLowerCase().includes(terme) ||
      p.prenom.toLowerCase().includes(terme) ||
      p.localite.toLowerCase().includes(terme) ||
      p.etat.toLowerCase().includes(terme)
    );
  }

  traitementsDuPatient(patient: Patient): TraitementAffichage[] {
    return this.traitements().filter(t => t.patient?.idUtilisateur === patient.idUtilisateur);
  }

  nomsTraitements(patient: Patient): string {
    const liste = this.traitementsDuPatient(patient);
    if (liste.length === 0) return '—';
    return liste.map(t => t.nomTraitement).join(', ');
  }

  traitementsDisponiblesPourMaladie(idMaladie: number): TraitementAffichage[] {
    return this.traitements().filter(t => t.maladie?.idMaladie === idMaladie);
  }

  choisirTraitement(idMaladie: number, event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.traitementsChoisis[idMaladie] = val ? +val : null;
  }

   
   nomsMaladies(patient: Patient): string {
    if (!patient.maladies || patient.maladies.length === 0) return '—';
    return patient.maladies.map(m => m.nom).join(', ');
  }

  toggleMaladie(idMaladie: number, event: Event) {
    const coche = (event.target as HTMLInputElement).checked;
    if (!this.formulaire.idMaladies) this.formulaire.idMaladies = [];
    if (coche) {
      this.formulaire.idMaladies.push(idMaladie);
    } else {
      this.formulaire.idMaladies = this.formulaire.idMaladies.filter(id => id !== idMaladie);
    }
  }

  maladieEstCochee(idMaladie: number): boolean {
    return this.formulaire.idMaladies?.includes(idMaladie) ?? false;
  }
  classeEtat(etat: EtatPatient): string {
    switch (etat) {
      case 'Stable':   return 'etat-stable';
      case 'Instable': return 'etat-instable';
      case 'Critique': return 'etat-critique';
      case 'Grave':    return 'etat-grave';
    }
  }

  ouvrirAjout() {
    this.formulaire = this.formulaireVide();
    this.traitementsChoisis = {};
    this.modalOuvert = 'ajouter';
  }

  ouvrirDetails(patient: Patient) {
    this.patientSelectionne = patient;
    this.modalOuvert = 'details';
  }

  ouvrirModification(patient: Patient) {
    this.patientSelectionne = patient;
    this.traitementsChoisis = {};
    this.formulaire = {
      ...patient,
      periode: patient.periode ? patient.periode.substring(0, 16) : '',
     idMaladies: patient.maladies ? patient.maladies.map(m => m.idMaladie!).filter(id => id !== undefined) : []
    };
    this.modalOuvert = 'modifier';
  }

private appliquerTraitementsChoisis(idPatient: number) {
    const user = this.authService.getUtilisateurConnecte();
    const idAgent = user?.idUtilisateur ?? user?.id;

    if (!idAgent) {
      console.warn('Impossible de trouver l\'ID de l\'agent connecté.');
      return;
    }

    const entrees = Object.entries(this.traitementsChoisis)
      .filter(([, idTraitement]) => idTraitement !== null);

    if (entrees.length === 0) return;

    entrees.forEach(([idMaladieStr, idTraitementModele]) => {
      const idMaladie = +idMaladieStr;
      const modele = this.traitements().find(t => t.idTraitement === idTraitementModele);
      if (!modele) return;

      const nouveauTraitement: any = {
        nomTraitement: modele.nomTraitement,
        description: modele.description,
        datedebut: new Date().toISOString().split('T')[0],
        datefin: null,
        idMaladie: idMaladie,
        idPatient: idPatient,
        idAgentSante: idAgent
      };

      this.traitementService.ajouterTraitement(nouveauTraitement).subscribe({
        next: () => this.chargerTraitements(),
        error: (err) => console.error('Erreur assignation traitement :', err)
      });
    });

    this.traitementsChoisis = {};
  }


  fermerModal() {
    this.modalOuvert = null;
    this.patientSelectionne = null;
  }

  enregistrerAjout() {
    this.patientService.addPatient(this.formulaire).subscribe({
      next: (patientCree) => {
        this.appliquerTraitementsChoisis(patientCree.idUtilisateur!);
        this.chargerPatients();
        this.fermerModal();
      },
      error: (err) => { console.error('Erreur ajout :', err); alert("L'ajout a échoué."); }
    });
  }

 enregistrerModification() {
    this.patientService.updatePatient(this.formulaire).subscribe({
      next: () => {
        this.appliquerTraitementsChoisis(this.formulaire.idUtilisateur!);
        this.chargerPatients();
        this.fermerModal();
      },
      error: (err) => { console.error('Erreur modification :', err); alert('La modification a échoué.'); }
    });
  }

  supprimerPatient(patient: Patient) {
    if (confirm(`Supprimer le patient ${patient.nom} ${patient.prenom} ?`)) {
      this.patientService.deletePatient(patient.idUtilisateur!).subscribe({
        next: () => { this.chargerPatients(); this.fermerModal(); },
        error: (err) => { console.error('Erreur suppression :', err); alert('La suppression a échoué.'); }
      });
    }
  }

  private formulaireVide(): Patient {
    return {
      nom: '', prenom: '', tel: '', motpass: '',
      age: null, sexe: '', periode: '',
      etat: 'Stable', localite: 'Bamako'
     , idMaladies: []
    };
  }
}