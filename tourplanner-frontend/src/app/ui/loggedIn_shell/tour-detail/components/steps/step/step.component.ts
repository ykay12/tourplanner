import { Component, Input, inject } from '@angular/core';

import { TourRoute } from '../../../../../../models/tourRoute.model'
import { FormatterService } from '../../../../../../services/formatting/formatterService.service';

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  //nur eine gemockte Route damit ich beim designen sehen kann, wie ein Step aussieht
  @Input() step!: TourRoute; 
  @Input() stepNumber!: number;

  public formatter = inject(FormatterService);
  
  getTransportIcon(): string {
    switch (this.step.transportMode.toLowerCase()) {
      case 'bike': return 'bike.png';
      case 'walk': return 'walk.png';
      case 'run': return 'run.png';
      case 'hike': return 'hike.png';
      default: return 'default.png';
    }
  }
}
