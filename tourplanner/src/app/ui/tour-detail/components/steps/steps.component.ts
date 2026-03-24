
//steps.component.ts

/*
Steps corresponds to Route
*/

import { Component, Inject } from '@angular/core';
import { StepComponent } from './step/step.component';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../../../states/app-state.service';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule, StepComponent],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {
  constructor(@Inject(AppStateService) public state: AppStateService) {}

  // computed getter für selectedTour
  get tour() {
    return this.state.selectedTour();
  }
}
