import { Component } from '@angular/core';
import { Sidebar } from '../../Component/sidebar/sidebar';
import { Header } from '../../Component/header/header';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [Sidebar,Header],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

}
