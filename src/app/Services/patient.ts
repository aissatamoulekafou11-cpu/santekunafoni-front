import { Injectable } from '@angular/core';
import { Patient } from '../Models/patient';

@Injectable({
  providedIn: 'root'   // une seule instance, partagée dans toute l'app
})
export class PatientService {

  private patients: Patient[] = [
    { idUtilisateur: 1,  nom: 'MOULEKAFOU', prenom: 'Aïcha',        age: 25, sexe: 'F', motpass: '********', tel: '70000001', role: 'PATIENT', periode: '2026-07-01T08:00', etat: 'Stable',   localite: 'Bamako' },
    { idUtilisateur: 2,  nom: 'KANADJI',    prenom: 'Oumar',        age: 40, sexe: 'M', motpass: '********', tel: '70000002', role: 'PATIENT', periode: '2026-07-02T09:30', etat: 'Instable', localite: 'Kayes' },
    { idUtilisateur: 3,  nom: 'DOUYON',     prenom: 'Issaka',       age: 33, sexe: 'M', motpass: '********', tel: '70000003', role: 'PATIENT', periode: '2026-07-03T10:00', etat: 'Critique', localite: 'Koro' },
    { idUtilisateur: 4,  nom: 'DIALLO',     prenom: 'Hamathi',      age: 28, sexe: 'M', motpass: '********', tel: '70000004', role: 'PATIENT', periode: '2026-07-04T11:15', etat: 'Stable',   localite: 'Hyppodrome' },
    { idUtilisateur: 5,  nom: 'DICKO',      prenom: 'Aliou',        age: 51, sexe: 'M', motpass: '********', tel: '70000005', role: 'PATIENT', periode: '2026-07-05T08:45', etat: 'Stable',   localite: 'Gao' },
    { idUtilisateur: 6,  nom: 'BERTHE',     prenom: 'Sidi Mohamed', age: 30, sexe: 'M', motpass: '********', tel: '77777777', role: 'PATIENT', periode: '2026-07-06T14:00', etat: 'Critique', localite: 'Sikasso' },
    { idUtilisateur: 7,  nom: 'SAMAKE',     prenom: 'Safiatou',     age: 22, sexe: 'F', motpass: '********', tel: '70000007', role: 'PATIENT', periode: '2026-07-07T15:30', etat: 'Instable', localite: 'Bamako' },
    { idUtilisateur: 8,  nom: 'Maiga',      prenom: 'Alhabibou',    age: 45, sexe: 'M', motpass: '********', tel: '70000008', role: 'PATIENT', periode: '2026-07-08T16:00', etat: 'Critique', localite: 'Kidal' },
    { idUtilisateur: 9,  nom: 'MAHAMADOU',  prenom: 'Abdoul Aziz',  age: 60, sexe: 'M', motpass: '********', tel: '70000009', role: 'PATIENT', periode: '2026-07-09T09:00', etat: 'Grave',    localite: 'Gao' },
    { idUtilisateur: 10, nom: 'DAGNO',      prenom: 'Awa',          age: 35, sexe: 'F', motpass: '********', tel: '70000010', role: 'PATIENT', periode: '2026-07-10T10:30', etat: 'Instable', localite: 'Koulikoro' },
    { idUtilisateur: 11, nom: 'SISSOKO',    prenom: 'Famory',       age: 29, sexe: 'M', motpass: '********', tel: '70000011', role: 'PATIENT', periode: '2026-07-11T11:00', etat: 'Stable',   localite: 'Kayes' },
  ];

  getPatients(): Patient[] {
    return this.patients;
  }

  getPatientById(id: number): Patient | undefined {
    return this.patients.find(p => p.idUtilisateur === id);
  }

  addPatient(patient: Omit<Patient, 'idUtilisateur'>): void {
    const nouvelId = this.patients.length > 0
      ? Math.max(...this.patients.map(p => p.idUtilisateur!)) + 1
      : 1;
    this.patients.push({ ...patient, idUtilisateur: nouvelId, role: 'PATIENT' });
  }

  updatePatient(patientModifie: Patient): void {
    const index = this.patients.findIndex(p => p.idUtilisateur === patientModifie.idUtilisateur);
    if (index !== -1) {
      this.patients[index] = { ...patientModifie };
    }
  }

  deletePatient(id: number): void {
    this.patients = this.patients.filter(p => p.idUtilisateur !== id);
  }
}