import { FormsModule } from '@angular/forms'; 
import { Component } from '@angular/core';
import { Administrateur } from '../../../Models/administrateur.model';
import { AdministrateurService } from '../../../Services/administrateur';
@Component({
  selector: 'app-admin-ajouter',
  imports: [FormsModule],
  templateUrl: './admin-ajouter.html',
  styleUrl: './admin-ajouter.css',
})
export class AdminAjouter {
   nouvelAdmin: Administrateur = {
  nom: '',
  prenom: '',
  email: '',
  motpass:''
};

  constructor(private administrateurService: AdministrateurService) {}

  onSubmit(): void {

console.log("Données envoyées :", this.nouvelAdmin);


this.administrateurService
.ajouterAdmin(this.nouvelAdmin)
.subscribe({

 next:(response)=>{

   console.log("Administrateur ajouté :", response);
   const boutonFermer = document.getElementById('fermerModal');

        if(boutonFermer){
          boutonFermer.click();
        }
   

 },

 error:(error)=>{

   console.log("STATUT :", error.status);
   console.log("MESSAGE :", error.message);
   console.log("ERREUR SERVEUR :", error.error);

 }

});
  }
}