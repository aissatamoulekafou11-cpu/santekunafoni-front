import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatients } from './list-patients';

describe('ListPatients', () => {
  let component: ListPatients;
  let fixture: ComponentFixture<ListPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPatients],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPatients);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
