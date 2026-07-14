import { Component, OnInit } from '@angular/core';
import { Traitement } from '../../Models/traitement.model';
import { ServiceTraitement } from '../../Services/TraitementService/service-traitement';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-traitement-component',
  imports: [],
  templateUrl: './modifier-traitement-component.html',
  styleUrl: './modifier-traitement-component.css',
})
export class ModifierTraitementComponent implements OnInit {
  traitement!: Traitement;

  constructor(
    private serviceTraitement: ServiceTraitement,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.serviceTraitement.getTraitementById(id).subscribe(data => this.traitement = data)
  }

  onSubmit(){
    this.serviceTraitement.modifierTraitement(this.traitement.idTraitement, this.traitement).subscribe(() =>{
      this.router.navigate(['/traitement']);
    })
  }
}
