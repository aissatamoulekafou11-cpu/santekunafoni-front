import { Routes } from '@angular/router';
import { ListSymptomesComponent } from './Pages/symptomes/list-symptomes/list-symptomes';
import { Header } from './Component/header/header';

export const routes: Routes = [
  { path: '', redirectTo: 'symptomes', pathMatch: 'full' },
  { path: 'symptomes', component: ListSymptomesComponent },
  {path: 'navbar', component: Header}
];