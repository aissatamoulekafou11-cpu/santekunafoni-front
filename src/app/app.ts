import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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