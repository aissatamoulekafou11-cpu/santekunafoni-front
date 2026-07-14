import { Routes } from '@angular/router';
import { AjouterTraitementComponent } from './Pages/ajouter-traitement-component/ajouter-traitement-component';
import { ModifierTraitementComponent } from './Pages/modifier-traitement-component/modifier-traitement-component';
import { ListeTraitement } from './Pages/traitementListeComponent/traitement-component';


export const routes: Routes = [
  { path: 'liste-traitement', component: ListeTraitement }, // Utilise le bon nom ici
  { path: '', redirectTo: '/traitement', pathMatch: 'full' },

  { path: 'ajouter-traitement', component: AjouterTraitementComponent },
  { path: 'modifier-traitement/:id_traitement', component: ModifierTraitementComponent },
];
