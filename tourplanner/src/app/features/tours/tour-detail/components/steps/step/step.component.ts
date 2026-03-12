import { Component, Input } from '@angular/core';

import { Route } from '../../../../models/route.model'

@Component({
  selector: 'app-step',
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  //nur eine gemockte Route damit ich beim designen sehen kann, wie ein Step aussieht
  @Input() step!: Route; //Aber welche Werte hat der jetzt?

  getTransportIcon(): string {
    switch(this.step.transportMode.toLowerCase()) {
      case 'bike': return 'bike.png';
      case 'walk': return 'walk.png';
      case 'run': return 'run.png';
      case 'hike': return 'hike.png';
    default: return 'default.png';
    }
  }
}
