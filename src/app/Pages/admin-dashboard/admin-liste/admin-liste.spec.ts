import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListe } from './admin-liste';

describe('AdminListe', () => {
  let component: AdminListe;
  let fixture: ComponentFixture<AdminListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListe],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
