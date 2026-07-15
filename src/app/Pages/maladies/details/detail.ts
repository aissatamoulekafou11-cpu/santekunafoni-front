import { Component } from '@angular/core';

@Component({
  selector: 'app-details-maladie',
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class DetailsMaladieComponent {

  isModalOpen = false;

  maladie = {
    id: 1,
    nom: 'Paludisme',
    description: 'Maladie infectieuse...',
    dateDeclaration: '05-06-2026'
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

}