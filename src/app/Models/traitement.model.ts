export interface Traitement{
    idTraitement: number;
    datedebut: Date | null;
    datefin: Date | null;
    description: String;
    nomTraitement: String;
    idAgentSante: number;
    idMaladie: number;
    idPatient: number;

}
// Interface utilisée uniquement pour LIRE les traitements depuis le backend
// (le backend renvoie les objets patient/maladie complets, pas juste leurs IDs)
export interface TraitementAffichage {
  idTraitement: number;
  nomTraitement: string;
  datedebut: string;
  datefin: string;
  description: string;
  maladie: { idMaladie: number; nom: string };
  patient: { idUtilisateur: number; nom: string; prenom: string };
  agentSante?: { idUtilisateur: number; nom?: string; prenom?: string };
}