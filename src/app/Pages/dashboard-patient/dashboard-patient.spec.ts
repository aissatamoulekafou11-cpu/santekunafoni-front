import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPatient } from './dashboard-patient';

describe('DashboardPatient', () => {
  let component: DashboardPatient;
  let fixture: ComponentFixture<DashboardPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPatient],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPatient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
