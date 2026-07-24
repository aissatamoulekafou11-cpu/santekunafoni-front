import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modifieragent } from './modifieragent';

describe('Modifieragent', () => {
  let component: Modifieragent;
  let fixture: ComponentFixture<Modifieragent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modifieragent],
    }).compileComponents();

    fixture = TestBed.createComponent(Modifieragent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
