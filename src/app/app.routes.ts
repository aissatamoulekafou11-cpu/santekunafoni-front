import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';


/*Awa*/
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { Header } from './Component/header/header';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
/*Awa*/

export const routes: Routes = [
  // 1. Quand on tape /symptomes, on affiche la liste des symptômes
  { path: 'symptomes', component: ListSymptomesComponent },

  // 2. Quand on tape /connexion, on affiche la page de Connexion
  { path: 'connexion', component: Connexion },
  
  // 3. Quand on tape /inscription, on affiche la page d'Inscription
  { path: 'inscription', component: Inscription },
  
  // 4. LIGNE UNIQUE DE REDIRECTION : Si l'adresse est vide, on va vers la connexion
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },

  // pour visualiser le composant navbar de l'administrateur
  {path: '', component: Header},

  {
    path: 'liste-traitement', component: ListeTraitement
  },

  {
    path: 'ajouter-tratement', component: AjouterTraitementComponent
  },

  {
    path: 'modifier-traitement', component: ModifierTraitementComponent
  }
];