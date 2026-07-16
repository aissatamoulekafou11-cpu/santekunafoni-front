import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth'; // Ajuste ce chemin si ton dossier services est ailleurs
import { Patient } from '../../Models/patient.model';
import { Role } from '../../Models/role.enum';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule], // On a ajouté CommonModule et ReactiveFormsModule
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription implements OnInit {
  
  inscriptionForm!: FormGroup;
  errorMessage: string = '';

  // On injecte les outils nécessaires dans le constructeur
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // On crée les contrôles du formulaire qui vont écouter notre HTML
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      age: ['', [Validators.required, Validators.min(0)]],
      sexe: ['', [Validators.required]],
      localite: ['', [Validators.required]],
      motpass: ['', [Validators.required, Validators.minLength(4)]],
      confirmerMotpass: ['', [Validators.required]]
    });
  }

 

    
onSubmit(): void {
  console.log("Tentative d'inscription...");
  console.log("Le formulaire est-il valide ?", this.inscriptionForm.valid);
  
  if (this.inscriptionForm.invalid) {
    this.errorMessage = "Veuillez remplir correctement tous les champs obligatoires.";
    
    // Ce code va lister précisément dans votre console F12 quel champ pose problème :
    Object.keys(this.inscriptionForm.controls).forEach(key => {
      const controlErrors = this.inscriptionForm.get(key)?.errors;
      if (controlErrors != null) {
        console.warn(`Le champ [${key}] est invalide. Erreurs :`, controlErrors);
      }
    });
    return;
  }

  const { motpass, confirmerMotpass } = this.inscriptionForm.value;
  if (motpass !== confirmerMotpass) {
    this.errorMessage = "Les mots de passe ne correspondent pas.";
    return;
  }

  const { confirmerMotpass: _, ...donneesFormulaire } = this.inscriptionForm.value;
  
  const nouveauPatient: Patient = {
    ...donneesFormulaire,
    role: Role.PATIENT
  };

  this.authService.inscriptionPatient(nouveauPatient).subscribe({
    next: (reponse) => {
      console.log('Inscription réussie ! Réponse du serveur :', reponse);
      this.router.navigate(['/connexion']);
    },
    error: (err) => {
      console.error('Erreur retournée par le serveur Spring Boot :', err);
      this.errorMessage = "Une erreur est survenue. Ce numéro de téléphone est probablement déjà utilisé.";
    }
  });
}
  }
