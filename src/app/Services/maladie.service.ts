import { Injectable, signal } from "@angular/core";
import { Maladie } from "../Models/maladie.model";

@Injectable({
    providedIn :'root'
})
export class MaladieService {

    Maladies = signal<Maladie[]>([
        {
            idMaladie: 1,nom: 'Paludisme',description: 'grave',dateDeclaration: '5/07/2026'
        }
    ])
}