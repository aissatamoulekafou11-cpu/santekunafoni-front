import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { ListNotificationsComponent } from './Pages/notifications/list-notifications/list-notifications';
// 1. Importer le composant Accueil
import { AccueilComponent } from './Pages/accueil/accueil';


/*Awa*/
import { Connexion } from './Pages/connexion/connexion';
import { Inscription } from './Pages/inscription/inscription';
import { MaladiesComponent } from './Pages/maladies/liste-maladie/liste-maladie';
import { Sidebar } from './Component/sidebar/sidebar';
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

  // 5. Maladie
  { path: 'maladies',  component: MaladiesComponent },

  //sidebar
  { path: 'sidebar',  component: Sidebar },




];