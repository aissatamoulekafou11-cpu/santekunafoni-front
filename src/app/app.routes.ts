import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';


// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
import { AgentDashboard } from './Pages/agent-dashboard/agent-dashboard';

import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';




// 1. Importer le composant Accueil
export const routes: Routes = [
  // Redirection par défaut vers 'accueil'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  // Définition des routes
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  
  {
    path: 'liste-traitement', component: ListeTraitement
  },
  {
    path: 'ajouter-tratement', component: AjouterTraitementComponent
  },

  {
    path: 'modifier-traitement/:id', component: ModifierTraitementComponent
  },
  
  { path: 'liste-traitement', component: ListeTraitement},
  { path: 'admin-dashboard', component: AdminDashboard},
  { path: 'ajouter-tratement', component: AjouterTraitementComponent},
  { path: 'modifier-traitement', component: ModifierTraitementComponent},
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },
  {path: 'agent-dashboard',component: AgentDashboard}
  
];
