import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // 1. On importe le mock de routeur d'Angular

import { Inscription } from './inscription';

describe('Inscription', () => {
  let component: Inscription;
  let fixture: ComponentFixture<Inscription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Inscription], // Ton composant Standalone reste ici
      providers: [provideRouter([])] // 2. On ajoute ça pour simuler le lien de retour vers la connexion
    }).compileComponents();

    fixture = TestBed.createComponent(Inscription);
    component = fixture.componentInstance;
    fixture.detectChanges(); // 3. On utilise detectChanges pour rafraîchir le composant proprement
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});