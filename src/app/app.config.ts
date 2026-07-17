import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './Services/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Indispensable pour tes services API
    provideHttpClient(),

    // 3. On configure le HttpClient pour qu'il utilise notre intercepteur JWT
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};