import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Sidebar } from './Component/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'santekunafoni-front';
  showSidebar = false;

  pagesWithoutSidebar = ['/accueil', '/connexion', '/inscription', '/'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Normalisation du chemin d'accès actuel
      const currentUrl = event.urlAfterRedirects.split('?')[0].replace(/\/$/, '') || '/';
      
      // Affiche la sidebar sur TOUTES les pages sauf les pages publiques
      this.showSidebar = !this.pagesWithoutSidebar.includes(currentUrl);
    });
  }
}