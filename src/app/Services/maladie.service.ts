import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Maladie } from "../Models/maladie.model";

@Injectable({
    providedIn: 'root'
})
export class MaladieService {

    private apiUrl = "http://localhost:8080/api/maladies";


    Maladies = signal<Maladie[]>([]);


    constructor(private http: HttpClient) { }



    getMaladies() {

        this.http.get<Maladie[]>(this.apiUrl)
            .subscribe({

                next: (data) => {

                    this.Maladies.set(data);

                },

                error: (err) => {

                    console.log(err);

                }

            });

    }

    // AJOUT D'UNE MALADIE
    createMaladie(maladie: Maladie) {

        return this.http.post<Maladie>(
            this.apiUrl,
            maladie
        );
    }


        //Modification d'une maladie 

        updateMaladie(id: number, maladie: Maladie){

            return this.http.put<Maladie>(
                `${this.apiUrl}/${id}`,
                maladie
            );

        }
    }