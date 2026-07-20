import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../Models/role.enum';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription implements OnInit {
  
  inscriptionForm!: FormGroup;
  errorMessage: string = '';

  // 2. MODIFICATION : On injecte l'AuthService ici dans le constructeur
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
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

    // 3. CORRECTION DU PIÈGE DE CASSE : On extrait 'motpass' pour le renommer en 'motPass'
    const { confirmerMotpass: _, motpass: pwd, ...donneesFormulaire } = this.inscriptionForm.value;
    
    // On structure l'objet exactement comme le PatientDTO du backend Spring Boot l'attend
    const patientDTO = {
      ...donneesFormulaire,
      motPass: pwd,       // <--- Crucial : avec un 'P' majuscule pour correspondre au DTO Java
      role: Role.PATIENT,
      etat: 'Actif',      // Valeur par défaut pour éviter un champ null en base
      periode: 'Matin',   // Valeur par défaut
      idMaladies: []      // Liste vide initiale pour éviter les plantages
    };

    this.errorMessage = '';

    // =========================================================================
    // APPEL DU SERVICE POUR L'INSCRIPTION
    // =========================================================================
    // On passe bien 'patientDTO' qu'on vient de préparer juste au-dessus !
    this.authService.inscriptionPatient(patientDTO).subscribe({
      next: (response) => {
        console.log("Inscription réussie ! Patient créé :", response);
        // Une fois inscrit, on redirige l'utilisateur vers la page de connexion
        this.router.navigate(['/connexion']); 
      },
      error: (err) => {
        console.error("Erreur lors de l'inscription :", err);
        this.errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
      }
    });
  }
}