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

  // La méthode qui sera appelée lors de la soumission du formulaire HTML
  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.errorMessage = "Veuillez remplir correctement tous les champs obligatoires.";
      return;
    }

    const { motpass, confirmerMotpass } = this.inscriptionForm.value;
    if (motpass !== confirmerMotpass) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    // On sépare confirmerMotpass des autres données pour Spring Boot
    const { confirmerMotpass: _, ...donneesFormulaire } = this.inscriptionForm.value;
    
    const nouveauPatient: Patient = {
      ...donneesFormulaire,
      role: Role.PATIENT // Le rôle est injecté automatiquement en arrière-plan
    };

    // On envoie le tout au service
    this.authService.inscriptionPatient(nouveauPatient).subscribe({
      next: (reponse) => {
        console.log('Inscription réussie !', reponse);
        this.router.navigate(['/connexion']); // Redirection vers la page de connexion
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription', err);
        this.errorMessage = "Une erreur est survenue. Le numéro de téléphone est peut-être déjà utilisé.";
      }
    });
  }
}