import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './Services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // HttpClient (UNE seule déclaration) + intercepteur JWT :
    // chaque requête sortante passera par authInterceptor,
    // qui ajoutera le token quand le login sera branché
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};