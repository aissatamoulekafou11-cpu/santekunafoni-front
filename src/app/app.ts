import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Sidebar } from './Component/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Sidebar
  ],
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
      this.showSidebar = !this.pagesWithoutSidebar.includes(event.urlAfterRedirects);
    });
  }
}