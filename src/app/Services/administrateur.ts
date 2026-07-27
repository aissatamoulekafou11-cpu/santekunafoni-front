import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Administrateur } from '../Models/administrateur.model';



@Injectable({
  providedIn: 'root'
})

export class AdministrateurService {
    private apiUrl = `${environment.apiUrl}/administrateurs`;

  constructor(private http: HttpClient) { }

  ajouterAdmin(admin: Administrateur): Observable<Administrateur> {
    return this.http.post<Administrateur>(this.apiUrl, admin);
  }
}
