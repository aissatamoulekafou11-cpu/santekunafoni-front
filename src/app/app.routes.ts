import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';

export const routes: Routes = [
  // 2. Rediriger le chemin par défaut (quand on ouvre l'app) vers 'accueil'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  
  // 3. Déclarer la route de la page d'accueil
  { path: 'accueil', component: AccueilComponent },
  
  // Vos autres routes existantes
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },
];