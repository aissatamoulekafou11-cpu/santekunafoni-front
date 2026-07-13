import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotifications } from './list-notifications';

describe('ListNotifications', () => {
  let component: ListNotifications;
  let fixture: ComponentFixture<ListNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNotifications],
    }).compileComponents();

    fixture = TestBed.createComponent(ListNotifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
