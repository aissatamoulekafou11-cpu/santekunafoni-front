import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Component/header/header";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {} // <-- Le nom exact attendu par Angular