import { Component, inject, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './Pages/sidebar-component/sidebar-component';
import { RouterModule } from '@angular/router';
import { ServiceTraitement } from './Services/TraitementService/service-traitement';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  imports: [RouterOutlet, SidebarComponent, RouterModule],
  styleUrl: './app.css',
})
export class App {
  traitement: any;
  serviceTraitement = inject(ServiceTraitement);
  protected readonly title = signal('santekunafoni-front');

  constructor() {
    this.traitement = this.serviceTraitement.getAllTraitement();
  }
}
