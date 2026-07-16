import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './Component/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'santekunafoni-front';

  // true = on affiche la sidebar, false = on la cache
  showSidebar = false;

  // Pages sans sidebar
  pagesWithoutSidebar = ['/accueil', '/connexion', '/inscription', '/'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Cache la sidebar sur les pages d'accueil/auth
      this.showSidebar = !this.pagesWithoutSidebar.includes(event.urlAfterRedirects);
    });
  }
}