import { Routes } from '@angular/router';
import { AccueilComponent } from './Pages/accueil/accueil';
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
import { AdminDashboard } from './Pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },
  { path: 'liste-traitement', component: ListeTraitement },
  { path: 'traitements', component: ListeTraitement },
  { path: 'ajouter-traitement', component: AjouterTraitementComponent },
  { path: 'modifier-traitement', component: ModifierTraitementComponent },
  { path: 'dashboard', component: AdminDashboard },
  { path: 'admin-dashboard', component: AdminDashboard },
  // Routes temporaires — à remplacer par les vrais composants quand ils seront créés
  { path: 'patients', component: AdminDashboard },
  { path: 'agents', component: AdminDashboard },
  { path: 'maladies', component: AdminDashboard },
  { path: 'profil', component: AdminDashboard },
  { path: '**', redirectTo: 'accueil' }
];