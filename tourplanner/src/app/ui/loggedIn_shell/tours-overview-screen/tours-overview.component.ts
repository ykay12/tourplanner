//tours-overview.component.ts

import { Component } from '@angular/core';
import { AppStateService } from '../../../states/app-state.service';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-tours-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tours-overview.component.html',
  styleUrl: './tours-overview.component.scss'
})
export class ToursOverviewComponent {

  constructor(
    public state: AppStateService,
    private router: Router) 
  {
      
  }

  //Funktion damit beim klicken auf eine Tour im Overview die selectedTour im State verändert wird und wir zur TourDetail Route navigieren
  goToTour(tourId: number) {
    // 1. State setzen
    this.state.selectTour(tourId);

    // 2. Navigieren zur TourDetail Route
    this.router.navigate(['/dashboard/tour-detail']);
  }

}
