import { Routes } from '@angular/router';
// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';
import { Connexion } from './Pages/connexion/connexion';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
import { Inscription } from './Pages/inscription/inscription';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';


export const routes: Routes = [
  // Redirection par défaut vers 'accueil' au lieu de 'connexion'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  // Définition des routes
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  { path: 'liste-traitement', component: ListeTraitement},
  { path: 'admin-dashboard', component: AdminDashboard},
  { path: 'ajouter-tratement', component: AjouterTraitementComponent},
  { path: 'modifier-traitement', component: ModifierTraitementComponent},
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },
];

