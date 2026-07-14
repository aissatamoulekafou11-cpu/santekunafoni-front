import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 1. On importe l'outil depuis Angular

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet], // 2. On l'injecte ici pour donner la permission au HTML
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
