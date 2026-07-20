import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';

//DICKO
import { DashboardPatient } from './Pages/dashboard-patient/dashboard-patient';
import { ListPatients } from './Pages/list-patients/list-patients';

// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';

/*Awa*/
import { Inscription } from './Pages/inscription/inscription';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';

import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';
import { Connexion } from './Pages/connexion/connexion';
import { AgentSanteListe } from './Component/agent-sante-liste/agent-sante-liste';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  
  { path: 'liste-traitement', component: ListeTraitement },
  { path: 'ajouter-tratement', component: AjouterTraitementComponent },
  { path: 'modifier-traitement/:id', component: ModifierTraitementComponent },
  
  { path: 'admin-dashboard', component: AdminDashboard },
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },
  
  { path: 'agents', component: AgentSanteListe },
  //DICKO
  { path: 'dashboard', component: DashboardPatient },
  { path: 'patients', component: ListPatients },
];