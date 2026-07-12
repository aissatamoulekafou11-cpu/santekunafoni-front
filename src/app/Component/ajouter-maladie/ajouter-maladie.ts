import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter-maladie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ajouter-maladie.html',
  styleUrl: './ajouter-maladie.css'
})
export class AjouterMaladie {
  // 1. Déclarez la propriété du formulaire sans l'initialiser ici
  maladieForm!: FormGroup; 

  // 2. Injectez le FormBuilder dans le constructeur et initialisez le formulaire à l'intérieur
  constructor(private fb: FormBuilder) {
    this.maladieForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      dateDeclaration: ['', Validators.required]
    });
  }

  ajouter() {
    console.log(this.maladieForm.value);
  }
}