import { Component, Inject } from '@angular/core';
import { AppStateService } from '../../../../../app-state.service';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  constructor(@Inject(AppStateService) public state: AppStateService) {
  }

}
