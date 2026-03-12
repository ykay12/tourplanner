import { Component } from '@angular/core';

import { Tour } from '../models/tour.model';
import { exampleTour } from '../mock-data/example-tour';
import { StepsComponent } from './components/steps/steps.component';
import { StepComponent } from './components/steps/step/step.component';

@Component({
  selector: 'app-tour-detail',
  imports: [StepComponent],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent {

  //mock-data zum designen  
  mock_tour: Tour = exampleTour; 

}
