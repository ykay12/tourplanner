//steps.component.ts

/*
Steps corresponds to Route
*/

import { Component, Inject } from '@angular/core';
import { StepComponent } from './step/step.component';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../../../states/app-state.service';

import { signal } from '@angular/core';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule, StepComponent],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss',
})
export class StepsComponent {
  constructor(@Inject(AppStateService) public state: AppStateService) {}

  // computed getter für selectedTour
  get tour() {
    return this.state.selectedTour();
  }

  //collapsing on mobile:
  collapsed = signal(window.innerWidth < 768);

  toggle() {
    this.collapsed.update((v) => !v);
  }
}
