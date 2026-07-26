import { Utilisateur } from './utilisateur.model';

export interface Patient extends Utilisateur {
  localite: string;
  age: number;      
  etat?: string;  
  sexe: string;
  periode?: string | Date; 
}