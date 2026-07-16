import { Component, OnInit, signal } from '@angular/core';
import { Traitement } from '../../Models/traitement.model'; // Ajuste les ../ selon le dossier
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar-component/sidebar-component";

@Component({
  selector: 'app-ajouter-traitement-component',
  imports: [FormsModule, SidebarComponent],
  templateUrl: './ajouter-traitement-component.html',
  styleUrl: './ajouter-traitement-component.css',
})
export class AjouterTraitementComponent implements OnInit {
  traitement: Traitement = {
    idTraitement: 0,
    datedebut: null,
    datefin: null,
    description: '',
    nomTraitement: '',
    id_agent_sante: 0,
    id_maladie: 0,
    id_patient: 0
  };
  idMaladie=signal<any>([]);
  idPatients=signal<any>([]);
  idAgent=signal<any>([]);
  constructor(private traitementService: ServiceTraitement, private router: Router) {
  }
  ngOnInit(): void {
    this.recup('http://localhost:8080/api/maladies',"maladies");
    this.recup('http://localhost:8080/api/patients',"patients");
    this.recup('http://localhost:8080/api/agents',"agents");
  }
  onSubmit(){
    this.traitementService.ajouterTraitement(this.traitement).subscribe(() => {
      this.router.navigate(['/traitements']);
    });
  }
  onAnnuler() {
    this.router.navigate(['/traitements']); // Redirection si clic sur Annuler
  }
  async recup(url:string,nom:string){
    if (nom==="maladies") {
        const donnees=await fetch(url);
        const donner=await donnees.json();
        this.idMaladie.set(donner);
    }

    if(nom==="patients"){
      const donnes=await fetch(url);
      const donner=await donnes.json();
      this.idPatients.set(donner);
       
    }

    if(nom==="agents"){
      const donnes=await fetch(url);
      const donner=await donnes.json();
      this.idAgent.set(donner);
       
    }

    
        
    }
    
   
      
    

  
}
