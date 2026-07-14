import { Utilisateur } from './utilisateur.model';

export interface AgentSante extends Utilisateur {
  specialite: string;
  centre: string;
  email: string;
}