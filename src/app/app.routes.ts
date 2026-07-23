import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';


//DICKO
import { DashboardPatient } from './Pages/dashboard-patient/dashboard-patient';
import { ListPatients } from './Pages/list-patients/list-patients';
//import { Placeholder } from './Pages/placeholder/placeholder';



// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';





/*Awa*/
// 1. Importer le composant Accueil

import { Inscription } from './Pages/inscription/inscription';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';

import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';
import { Connexion } from './Pages/connexion/connexion';
import { ListeMaladieComponent } from './Pages/maladies/liste-maladie/liste-maladie';



export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  {
    path: 'connexion', component: Connexion
  },
  
  { path: 'inscription', component: Inscription },

  { path: 'maladies', component: ListeMaladieComponent },
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

  //DICKO
  { path: 'dashboard', component: DashboardPatient },
      { path: 'patients',  component: ListPatients },

];
