// Représente la structure des données du graphique d'alertes
export interface ChartDataDTO {
  labels: string[];   // Liste des mois ou jours (ex: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'])
  donnees: number[];  // Nombre d'alertes correspondant (ex: [12, 25, 18, 32, 20, 40])
}

// Interface globale du dashboard
export interface DashboardStats {
  totalAgentsSante: number;
  totalPatients: number;
  totalNotifications: number;
  grapheAlertes?: ChartDataDTO; // Données dynamiques du graphe envoyées par Spring Boot
}