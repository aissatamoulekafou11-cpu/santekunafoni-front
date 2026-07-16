import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
import { AccueilComponent } from './Pages/accueil/accueil';

/* Awa */
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
import { SidebarComponent } from './Component/sidebar/sidebar'; // 1. Importation corrigée de la Sidebar globale
import { SidebarComponent as AdminSidebarComponent } from './Pages/sidebar-component/sidebar-component'; // Alias pour éviter les conflits de nom
/* Awa */

export const routes: Routes = [
  // Redirection par défaut vers 'accueil'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  // Définition des routes
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  { path: 'sidebar', component: SidebarComponent }, // Utilise maintenant SidebarComponent
  
  {
    path: 'liste-traitement', component: ListeTraitement
  },
  {
    path: 'ajouter-tratement', component: AjouterTraitementComponent
  },
  {
    path: 'sidebar-component', component: AdminSidebarComponent
  },
  {
    path: 'modifier-traitement', component: ModifierTraitementComponent
  },
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },

  // Redirection en cas de route inconnue (évite les pages blanches)
  { path: '**', redirectTo: 'accueil' }
];