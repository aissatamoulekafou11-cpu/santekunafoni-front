import { TestBed } from '@angular/core/testing';
import { AdminDashboard } from '../Pages/admin-dashboard/admin-dashboard';


describe('AdminDashboard', () => {
  let service: AdminDashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
