import { Component } from '@angular/core';

import { AppStateService } from '../../../app-state.service';
import { StepsComponent } from './components/steps/steps.component';
import { OverviewComponent } from './components/overview/overview.component';
import { MapComponent } from './components/map/map.component';
import { LogsComponent } from './components/logs/logs.component';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [StepsComponent, OverviewComponent, MapComponent, LogsComponent],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent {

  constructor(public state: AppStateService) 
  {
    
  }

}
