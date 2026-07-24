import { Routes } from '@angular/router';

/* Authentification */
import { AccueilComponent } from './Pages/accueil/accueil';
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';

/* Dashboards */
import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';
import { AgentDashboard } from './Pages/agent-dashboard/agent-dashboard';
import { DashboardPatient } from './Pages/dashboard-patient/dashboard-patient';

/* Agents */
import { AgentSanteListe } from './Component/agent-sante-liste/agent-sante-liste';
import { Modifieragent } from './Pages/admin/modifieragent/modifieragent';

/* Patients */
import { ListPatients } from './Pages/list-patients/list-patients';

/* Santé */
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListeMaladieComponent } from './Pages/maladies/liste-maladie/liste-maladie';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';

/* Traitements */
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';

/* Composants */
import { Sidebar } from './Component/sidebar/sidebar';
import { SidebarComponent } from './Pages/sidebar-component/sidebar-component';

export const routes: Routes = [

  // Redirection par défaut
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  /* Authentification */
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },

  /* Dashboards */
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'agent-dashboard', component: AgentDashboard },
  { path: 'dashboard', component: DashboardPatient },

  /* Agents */
  { path: 'agents', component: AgentSanteListe },
  { path: 'modifieragent/:id', component: Modifieragent },

  /* Patients */
  { path: 'patients', component: ListPatients },

  /* Santé */
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'maladies', component: ListeMaladieComponent },
  { path: 'list-maladies', component: ListeMaladieComponent },
  { path: 'notifications', component: ListNotificationsComponent },

  /* Traitements */
  { path: 'traitements', component: ListeTraitement },
  { path: 'liste-traitement', component: ListeTraitement }, // Compatibilité
  { path: 'ajouter-tratement', component: AjouterTraitementComponent },
  { path: 'modifier-traitement/:id', component: ModifierTraitementComponent },

  /* Composants de test */
  { path: 'sidebar', component: Sidebar },
  { path: 'sidebar-component', component: SidebarComponent },

  /* Déconnexion */
  { path: 'deconnexion', component: Connexion }

];