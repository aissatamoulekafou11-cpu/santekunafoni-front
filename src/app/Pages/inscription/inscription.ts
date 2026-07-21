import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription implements OnInit {

  inscriptionForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.inscriptionForm = this.fb.group({

      nom: [
        '',
        [Validators.required]
      ],

      prenom: [
        '',
        [Validators.required]
      ],

      tel: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ],

      age: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      sexe: [
        '',
        [Validators.required]
      ],

      localite: [
        '',
        [Validators.required]
      ],

      motpass: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],

      confirmerMotpass: [
        '',
        [Validators.required]
      ]

    });

  }


  onSubmit(): void {

    console.log("Tentative d'inscription...");

    console.log(
      "Le formulaire est-il valide ?",
      this.inscriptionForm.valid
    );


    if (this.inscriptionForm.invalid) {

      this.errorMessage =
        "Veuillez remplir correctement tous les champs obligatoires.";

      Object.keys(this.inscriptionForm.controls).forEach(key => {

        const errors =
          this.inscriptionForm.get(key)?.errors;

        if (errors) {

          console.warn(
            `Le champ [${key}] est invalide :`,
            errors
          );

        }

      });

      return;
    }


    const {
      motpass,
      confirmerMotpass
    } = this.inscriptionForm.value;



    // Vérification des mots de passe
    if (motpass !== confirmerMotpass) {

      this.errorMessage =
        "Les mots de passe ne correspondent pas.";

      return;
    }



    /*
       Transformation du formulaire Angular
       vers le PatientDTO Spring Boot
    */

    const patientDTO = {

      nom: this.inscriptionForm.value.nom,

      prenom: this.inscriptionForm.value.prenom,

      tel: this.inscriptionForm.value.tel,

      motPass: motpass,

      localite: this.inscriptionForm.value.localite,

      age: this.inscriptionForm.value.age,

      sexe: this.inscriptionForm.value.sexe,

      etat: "Actif",

      // Le backend attend une Date
      periode: new Date().toISOString(),

      // Aucun problème au départ
      idMaladies: []

    };


    console.log(
      "Données envoyées au backend :",
      patientDTO
    );


    this.errorMessage = "";


    this.authService.inscriptionPatient(patientDTO)
      .subscribe({

        next: (response) => {

          console.log(
            "Inscription réussie ! Patient créé :",
            response
          );


          this.router.navigate([
            '/connexion'
          ]);

        },


        error: (err) => {

          console.error(
            "Erreur lors de l'inscription :",
            err
          );


          this.errorMessage =
            "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";

        }

      });

  }

}