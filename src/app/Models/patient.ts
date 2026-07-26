// Reflète la table MySQL `patient` — Patient HÉRITE de Utilisateur
import { Utilisateur } from './utilisateur';

export type EtatPatient = 'Stable' | 'Instable' | 'Critique' | 'Grave';

export interface Patient extends Utilisateur {
  age: number | null;
  sexe: string;
  periode: string;      // datetime MySQL → string ISO ("2026-07-01T08:00")
  etat: EtatPatient;
  localite: string;
}