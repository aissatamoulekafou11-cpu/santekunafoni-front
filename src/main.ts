import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Modifie "App" par "AppComponent" ici

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));