export interface Traitement{
    idTraitement: number;
    datedebut: Date | null;
    datefin: Date | null;
    description: String;
    nomTraitement: String;
    id_agent_sante: number;
    id_maladie: number;
    id_patient: number;

}
