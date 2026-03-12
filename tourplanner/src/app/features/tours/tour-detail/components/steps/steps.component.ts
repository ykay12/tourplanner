
//steps.component.ts

/*
Steps corresponds to Route
*/

import { Component, Input } from '@angular/core';
import { Tour } from '../../../models/tour.model';
import { StepComponent } from './step/step.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule, StepComponent],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.scss'
})
export class StepsComponent {
  @Input() tour!: Tour;
}
