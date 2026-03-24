import { Component, Inject } from '@angular/core';
import { AppStateService } from '../../../../states/app-state.service';

@Component({
  selector: 'app-logs',
  imports: [],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {

  constructor(@Inject(AppStateService) public state: AppStateService){

  }

  // computed getter für selectedTour
  get tour() {
    return this.state.selectedTour();
  }

}
