import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteEpidemie } from './alerte-epidemie';

describe('AlerteEpidemie', () => {
  let component: AlerteEpidemie;
  let fixture: ComponentFixture<AlerteEpidemie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlerteEpidemie],
    }).compileComponents();

    fixture = TestBed.createComponent(AlerteEpidemie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
