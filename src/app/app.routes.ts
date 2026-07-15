import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { MaladiesComponent } from './Pages/maladies/liste-maladie/liste-maladie';
import { Sidebar } from './Component/sidebar/sidebar';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { Header } from './Component/header/header';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';


export const routes: Routes = [
  // Redirection par défaut vers 'accueil' au lieu de 'connexion'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  // Définition des routes
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: Connexion },
  { path: 'inscription', component: Inscription },
  { path: 'sidebar', component: Sidebar },
  
  // 4. LIGNE UNIQUE DE REDIRECTION : Si l'adresse est vide, on va vers la connexion
  { path: '', redirectTo: 'connexion', pathMatch: 'full' }, 

  // 5. Maladie
  { path: 'maladies',  component: MaladiesComponent },

  //sidebar
  { path: 'sidebar',  component: Sidebar },




  // pour visualiser le composant navbar de l'administrateur
  { path: '', component: Header },

  {
    path: 'liste-traitement',
    component: ListeTraitement,
  },

  {
    path: 'ajouter-tratement',
    component: AjouterTraitementComponent,
  },
  {
    path: 'sidebar-component', component:  SidebarComponent
  },

  {
    path: 'modifier-traitement', component: ModifierTraitementComponent
  },
  { path: 'symptomes', component: ListSymptomesComponent },
  { path: 'notifications', component: ListNotificationsComponent },
];

