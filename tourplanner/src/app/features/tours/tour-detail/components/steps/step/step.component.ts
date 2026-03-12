import { Component, Input } from '@angular/core';

import { Route } from '../../../../models/route.model'
import { exampleTour } from '../../../../mock-data/example-tour';

@Component({
  selector: 'app-step',
  imports: [],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  //nur eine gemockte Route damit ich beim designen sehen kann, wie ein Step aussieht
  @Input() step1!: Route; //Aber welche Werte hat der jetzt?

}
