import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMaladie } from './ajouter-maladie';

describe('AjouterMaladie', () => {
  let component: AjouterMaladie;
  let fixture: ComponentFixture<AjouterMaladie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterMaladie],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterMaladie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
