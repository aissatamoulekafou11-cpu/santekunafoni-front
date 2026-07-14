import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTraitementComponent } from './ajouter-traitement-component';

describe('AjouterTraitementComponent', () => {
  let component: AjouterTraitementComponent;
  let fixture: ComponentFixture<AjouterTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterTraitementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterTraitementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
