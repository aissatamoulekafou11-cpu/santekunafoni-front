import { Role } from './role.enum';

export interface Utilisateur {
  idUtilisateur: number;
  nom: string;
  prenom: string;
  tel: string;      
  motpass: string;   
  role?: Role;       
}