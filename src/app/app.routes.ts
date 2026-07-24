import { Routes } from '@angular/router';

// Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';

/* Auth & Authentification */
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';

/* Dashboards */
import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';
import { AgentDashboard } from './Pages/agent-dashboard/agent-dashboard';
import { DashboardPatient } from './Pages/dashboard-patient/dashboard-patient';

/* Modules de gestion */
import { ListPatients } from './Pages/list-patients/list-patients';
import { AgentSanteListe } from './Component/agent-sante-liste/agent-sante-liste';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListeMaladieComponent } from './Pages/maladies/liste-maladie/liste-maladie';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';

/* Traitements */
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';

<<<<<<< HEAD
import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';
import { Connexion } from './Pages/connexion/connexion';
import { ListeMaladieComponent } from './Pages/maladies/liste-maladie/liste-maladie';



=======
>>>>>>> 93c53d563e75f7d054e608af62de464d4e855333
export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
<<<<<<< HEAD

  { path: 'maladies', component: ListeMaladieComponent },
  {
    path: 'liste-traitement', component: ListeTraitement
  },
  {
    path: 'ajouter-tratement', component: AjouterTraitementComponent
  },
=======
>>>>>>> 93c53d563e75f7d054e608af62de464d4e855333

  // Dashboards
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'agent-dashboard', component: AgentDashboard },
  { path: 'dashboard', component: DashboardPatient },

  // Patient & Agent
  { path: 'patients', component: ListPatients },
  { path: 'agents', component: AgentSanteListe },

  // Santé & Diagnostic
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'maladies', component: ListeMaladieComponent },
  { path: 'notifications', component: ListNotificationsComponent },
  { path: 'list-maladies', component: ListeMaladieComponent},

  // Traitements
  { path: 'traitements', component: ListeTraitement },
  { path: 'liste-traitement', component: ListeTraitement }, // Conservé pour rétrocompatibilité
  { path: 'ajouter-tratement', component: AjouterTraitementComponent },
  { path: 'modifier-traitement/:id', component: ModifierTraitementComponent },

  // Profil et Déconnexion
  { path: 'deconnexion', component: Connexion }
];