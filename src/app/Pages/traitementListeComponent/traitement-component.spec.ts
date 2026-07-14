import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Traitement } from './traitement-component';

describe('Traitement', () => {
  let component: Traitement;
  let fixture: ComponentFixture<Traitement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Traitement],
    }).compileComponents();

    fixture = TestBed.createComponent(Traitement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
