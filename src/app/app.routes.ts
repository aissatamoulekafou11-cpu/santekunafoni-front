import { Routes } from '@angular/router';

// import { Dashboard } from './Pages/AgentSante/dashboard/dashboard';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { Header } from './Component/header/header';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
import { Sidebar } from './Component/sidebar/sidebar';
import { SidebarComponent } from './Pages/sidebar-component/sidebar-component';
import { AccueilComponent } from './Pages/accueil/accueil';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
import { Modifieragent } from './Pages/admin/modifieragent/modifieragent';
import { AgentSanteListe } from './Component/agent-sante-liste/agent-sante-liste';

/*Awa*/

export const routes: Routes = [
  // Redirection par défaut vers 'accueil' au lieu de 'connexion'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },


  // Définition des routes
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  { path: 'sidebar', component: Sidebar },
  
 

  // // pour visualiser le composant navbar de l'administrateur
  // {path: '', component: Header},

  {
    path: 'liste-traitement', component: ListeTraitement
  },

  {
    path: 'ajouter-tratement', component: AjouterTraitementComponent
  },
  //  {
  //   path: 'dashboard',
  //   component: Dashboard
  // },

  {
    path: 'sidebar-component', component:  SidebarComponent
  },

  {
    path: 'modifier-traitement', component: ModifierTraitementComponent
  },
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },

  {
  path: 'modifieragent/:id',
  component: Modifieragent
},

{ path: 'agents', component: AgentSanteListe }

];