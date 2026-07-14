import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Maladie } from '../../../Models/maladie.model';

@Component({
  selector: 'app-details-maladie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class DetailsMaladieComponent {
  // On reçoit la maladie sélectionnée depuis la liste parente
  @Input() maladie: Maladie | null = null;
  
  // Événement pour notifier le parent de fermer la modal
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}