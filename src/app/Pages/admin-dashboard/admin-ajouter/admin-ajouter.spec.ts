import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAjouter } from './admin-ajouter';

describe('AdminAjouter', () => {
  let component: AdminAjouter;
  let fixture: ComponentFixture<AdminAjouter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAjouter],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAjouter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
