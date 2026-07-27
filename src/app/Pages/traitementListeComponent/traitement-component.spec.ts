import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeTraitement } from './traitement-component'; // Assurez-vous du bon chemin

describe('ListeTraitement', () => {
  let component: ListeTraitement;
  let fixture: ComponentFixture<ListeTraitement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTraitement],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeTraitement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});