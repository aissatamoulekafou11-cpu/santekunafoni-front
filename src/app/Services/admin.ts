import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Administrateur } from '../Models/administrateur.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrateurService {

  private apiUrl = 'http://localhost:8080/api/administrateurs';

  constructor(private http: HttpClient) { }

}