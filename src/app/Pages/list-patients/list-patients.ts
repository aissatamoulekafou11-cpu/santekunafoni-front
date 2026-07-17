import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient, EtatPatient } from '../../Models/patient';
import { PatientService } from '../../Services/patient';
// La PAGE s'appelle ListPatients, mais le SERVICE reste PatientService :
// il est nommé d'après la donnée, pas d'après une page.

@Component({
  selector: 'app-list-patients',
  imports: [FormsModule],
  templateUrl: './list-patients.html',
  styleUrl: './list-patients.css'
})
export class ListPatients {
  private patientService = inject(PatientService);

  recherche = '';
  etatsDisponibles: EtatPatient[] = ['Stable', 'Instable', 'Critique', 'Grave'];

  // Quel modal est ouvert ? (null = aucun)
  modalOuvert: 'ajouter' | 'details' | 'modifier' | null = null;
  patientSelectionne: Patient | null = null;
  formulaire: Patient = this.formulaireVide();

  /** Liste filtrée par la barre de recherche */
  get patients(): Patient[] {
    const terme = this.recherche.toLowerCase().trim();
    const liste = this.patientService.getPatients();
    if (!terme) return liste;
    return liste.filter(p =>
      p.nom.toLowerCase().includes(terme) ||
      p.prenom.toLowerCase().includes(terme) ||
      p.localite.toLowerCase().includes(terme) ||
      p.etat.toLowerCase().includes(terme)
    );
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
    this.formulaire = { ...patient };   // copie : la liste ne bouge qu'à "Enregistrer"
    this.modalOuvert = 'modifier';
  }

  fermerModal() {
    this.modalOuvert = null;
    this.patientSelectionne = null;
  }

  enregistrerAjout() {
    this.patientService.addPatient(this.formulaire);
    this.fermerModal();
  }

  enregistrerModification() {
    this.patientService.updatePatient(this.formulaire);
    this.fermerModal();
  }

  supprimerPatient(patient: Patient) {
    const confirme = confirm(`Supprimer le patient ${patient.nom} ${patient.prenom} ?`);
    if (confirme) {
      this.patientService.deletePatient(patient.idUtilisateur!);
      this.fermerModal();
    }
  }

  private formulaireVide(): Patient {
    return {
      nom: '', prenom: '', tel: '', motpass: '',
      age: null, sexe: '', periode: '',
      etat: 'Stable', localite: ''
    };
  }
}