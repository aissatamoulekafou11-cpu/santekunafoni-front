import { Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Traitement } from '../../Models/traitement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceTraitement {
  private apiUrl = 'http://localhost:8080/api/traitements';
  constructor(private http: HttpClient) {}

  ajouterTraitement(traitement: Traitement): Observable<Traitement> {
    return this.http.post<Traitement>(this.apiUrl, traitement);
  }

  getAllTraitement() : Observable<Traitement[]>{
    return this.http.get<Traitement[]>(this.apiUrl)
  }

  getTraitementById(id_traitement : number ) : Observable<Traitement>{
    return this.http.get<Traitement>(`${this.apiUrl}/${id_traitement}`)
  }

  modifierTraitement(id_traitement : number, traitement : Traitement) : Observable<Traitement>{
    return this.http.put<Traitement>(`${this.apiUrl}/${id_traitement}`, traitement);
  }

  deleteTraitement(id_traitement : number) : Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id_traitement}`);
  }

}

