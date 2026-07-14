import { Role } from './role.enum';

export interface Utilisateur {
  nom: string;
  prenom: string;
  tel: string;      
  motpass: string;   
  role?: Role;       
}