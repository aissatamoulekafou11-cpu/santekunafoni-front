import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient, EtatPatient } from '../../Models/patient';
import { PatientService } from '../../Services/patient';
import { MaladieService } from '../../Services/maladie.service';
import { SidebarComponent } from '../sidebar-component/sidebar-component';

@Component({
  selector: 'app-list-patients',
  imports: [FormsModule, SidebarComponent],
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

  // ═══ NOUVEAU : la copie locale + les états d'attente ═══
  listePatients: Patient[] = [];   // ce que l'API nous a envoyé
  chargement = true;              // true pendant qu'on attend la réponse
  erreur = '';                     // message si l'API est injoignable

  /** Au démarrage du composant : premier chargement depuis MySQL */
  ngOnInit() {
    this.chargerPatients();
    this.maladieService.getMaladies();

  }

  /** LA méthode centrale : commande la liste et s'abonne à la réponse */
  chargerPatients() {
    this.chargement = true;
    this.erreur = '';
    this.patientService.getPatients().subscribe({
      next: (data) => {                     // ✅ les données sont arrivées
        this.listePatients = data;
        this.chargement = false;
        this.cdr.detectChanges();
        
      },
      error: (err) => {                     // ❌ l'API n'a pas répondu
        console.error('Erreur API :', err);
        this.erreur = 'Impossible de charger les patients. Le serveur Spring est-il démarré ?';
        this.chargement = false;
      }
    });
  }

  /** Le filtre de recherche travaille sur la copie locale */
  get patients(): Patient[] {
    const terme = this.recherche.toLowerCase().trim();
    if (!terme) return this.listePatients;
    return this.listePatients.filter(p =>
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

  // ─── Ouverture/fermeture des modals : INCHANGÉ ───

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

  // ─── Les actions CRUD : maintenant avec .subscribe() ───

  /** POST → succès : on recharge la liste depuis MySQL */
  enregistrerAjout() {
    this.patientService.addPatient(this.formulaire).subscribe({
      next: () => {
        this.chargerPatients();      // resynchronisation avec la base
        this.fermerModal();
      },
      error: (err) => {
        console.error('Erreur ajout :', err);
        alert("L'ajout a échoué. Vérifie que le serveur tourne.");
      }
    });
  }

  /** PUT → succès : rechargement */
  enregistrerModification() {
    this.patientService.updatePatient(this.formulaire).subscribe({
      next: () => {
        this.chargerPatients();
        this.fermerModal();
      },
      error: (err) => {
        console.error('Erreur modification :', err);
        alert('La modification a échoué.');
      }
    });
  }

  /** DELETE → succès : rechargement */
  supprimerPatient(patient: Patient) {
    const confirme = confirm(`Supprimer le patient ${patient.nom} ${patient.prenom} ?`);
    if (confirme) {
      this.patientService.deletePatient(patient.idUtilisateur!).subscribe({
        next: () => {
          this.chargerPatients();
          this.fermerModal();
        },
        error: (err) => {
          console.error('Erreur suppression :', err);
          alert('La suppression a échoué.');
        }
      });
    }
  }

  private formulaireVide(): Patient {
    return {
      nom: '', prenom: '', tel: '', motpass: '',
      age: null, sexe: '', periode: '',
      etat: 'Stable', localite: '', idMaladies: []
    };
  }
}