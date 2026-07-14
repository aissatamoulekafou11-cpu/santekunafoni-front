import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';


/*Awa*/
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { Header } from './Component/header/header';
/*Awa*/

export const routes: Routes = [
  // Redirection par défaut vers 'accueil' au lieu de 'connexion'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  // Définition des routes
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent }
];