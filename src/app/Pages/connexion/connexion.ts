import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule], // Ajout des modules indispensables
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion implements OnInit {

  connexionForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif pour la connexion
    this.connexionForm = this.fb.group({
      tel: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      motpass: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.connexionForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement.";
      return;
    }

    // 1. On extrait les identifiants du formulaire
    const { tel, motpass } = this.connexionForm.value;

    // 2. On envoie l'objet groupé { tel, motpass } au service
    this.authService.connexion({ tel, motpass }).subscribe({
      next: (reponse) => {
        console.log('Connexion réussie ! Data reçue du backend :', reponse);
        
        // 3. Sauvegarde des infos de l'utilisateur dans le localStorage
        this.authService.sauvegarderSession(reponse);
        console.log('Utilisateur sauvegardé en session ! ✅');

        // Redirection intelligente selon le rôle renvoyé par Spring Boot
        if (reponse.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (reponse.role === 'AGENT_SANTE') {
          this.router.navigate(['/agent/dashboard']);
        } else {
          this.router.navigate(['/patient/accueil']);
        }
      },
      error: (err) => {
        console.error('Erreur de connexion détaillée :', err);
        this.errorMessage = "Téléphone ou mot de passe incorrect.";
      }
    });
  }
}