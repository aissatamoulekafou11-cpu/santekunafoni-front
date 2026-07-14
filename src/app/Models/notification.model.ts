export interface Notification {
  id?: number;
  titre: string;
  message: string;
  datePublication?: string;
  lue: boolean;
  utilisateur?: {
    idUtilisateur: number;
    nom?: string;
    prenom?: string;
  } | null;
}