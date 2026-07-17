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
