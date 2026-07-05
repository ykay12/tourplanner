//dashboard-home.component.ts
import { Component, computed } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { AppStateService } from '../../../states/app-state.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {

  constructor(
    public state: AppStateService,
    private router: Router,
  ) { }

  recentTours = computed(() => {
    const tours = this.state.tours() ?? [];
    return tours.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 3)
  })

  /////////////////
  //ROUTING-LOGIK
  /////////////////

  //Funktion damit beim klicken auf eine Tour im Overview die selectedTour im State verändert wird und wir zur TourDetail Route navigieren
  goToTour(tourId: number) {
    // 1. State setzen
    this.state.selectTour(tourId);

    // 2. Navigieren zur TourDetail Route
    this.router.navigate(['/dashboard/tour-detail']);
  }
}
