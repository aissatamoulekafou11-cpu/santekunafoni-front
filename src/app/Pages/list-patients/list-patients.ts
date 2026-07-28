import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient, EtatPatient } from '../../Models/patient';
import { PatientService } from '../../Services/patient';
import { MaladieService } from '../../Services/maladie.service';

@Component({
  selector: 'app-list-patients',
  imports: [FormsModule],
  templateUrl: './list-patients.html',
  styleUrl: './list-patients.css'
})
export class ListPatients implements OnInit {
  private patientService = inject(PatientService);
  maladieService = inject(MaladieService);
  private cdr = inject(ChangeDetectorRef);

  recherche = '';
  etatsDisponibles: EtatPatient[] = ['Stable', 'Instable', 'Critique', 'Grave'];

  modalOuvert: 'ajouter' | 'details' | 'modifier' | null = null;
  patientSelectionne: Patient | null = null;
  formulaire: Patient = this.formulaireVide();

  // ═══ Les 3 états en SIGNALS (notifient l'écran automatiquement) ═══
  listePatients = signal<Patient[]>([]);
  chargement = signal(false);
  erreur = signal('');
  // ═══ NOUVEAU : la copie locale + les états d'attente ═══
                  
  ngOnInit() {
    this.chargerPatients();
    this.maladieService.getMaladies();

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
    this.modalOuvert = 'ajouter';
  }

  ouvrirDetails(patient: Patient) {
    this.patientSelectionne = patient;
    this.modalOuvert = 'details';
  }

  ouvrirModification(patient: Patient) {
    this.patientSelectionne = patient;
    this.formulaire = {
      ...patient,
      periode: patient.periode ? patient.periode.substring(0, 16) : '',
     idMaladies: patient.maladies ? patient.maladies.map(m => m.idMaladie!).filter(id => id !== undefined) : []
    };
    this.modalOuvert = 'modifier';
  }

  fermerModal() {
    this.modalOuvert = null;
    this.patientSelectionne = null;
  }

  enregistrerAjout() {
    this.patientService.addPatient(this.formulaire).subscribe({
      next: () => { this.chargerPatients(); this.fermerModal(); },
      error: (err) => { console.error('Erreur ajout :', err); alert("L'ajout a échoué."); }
    });
  }

  enregistrerModification() {
    this.patientService.updatePatient(this.formulaire).subscribe({
      next: () => { this.chargerPatients(); this.fermerModal(); },
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