import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTraitementComponent } from './modifier-traitement-component';

describe('ModifierTraitementComponent', () => {
  let component: ModifierTraitementComponent;
  let fixture: ComponentFixture<ModifierTraitementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTraitementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifierTraitementComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
