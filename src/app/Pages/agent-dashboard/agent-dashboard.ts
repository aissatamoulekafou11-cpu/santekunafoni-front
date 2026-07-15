import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar-component/sidebar-component';
import { Header } from '../../Component/header/header';
@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [
    SidebarComponent,Header
  ],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard {

  nombrePatients = 0;
  nombreSymptomes = 0;
  nombreMaladies = 0;
  nombreTraitements = 0;

}