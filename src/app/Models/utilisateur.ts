// Reflète la table MySQL `utilisateur`
export type Role = 'ADMIN' | 'AGENT_SANTE' | 'PATIENT';

export interface Utilisateur {
  idUtilisateur?: number;  // "?" = optionnel : AUTO_INCREMENT généré par MySQL
  nom: string;
  prenom: string;
  tel: string;
  motpass: string;
  role?: Role;             // servira au login pour choisir le bon dashboard
}