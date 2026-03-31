//tours-overview.component.ts

import { Component, signal, computed } from '@angular/core';
import { AppStateService } from '../../../states/app-state.service';
import { Router } from '@angular/router';
import { TourPreviewComponent } from './tour-preview/tour-preview.component';

@Component({
  selector: 'app-tours-overview',
  standalone: true,
  imports: [TourPreviewComponent],
  templateUrl: './tours-overview.component.html',
  styleUrl: './tours-overview.component.scss',
})
export class ToursOverviewComponent {
  constructor(
    public state: AppStateService,
    private router: Router,
  ) {}

  //Signal für Sucheingabe -> zum Filtern der Touren und für Two-Way-Binding mit der Searchbar
  searchTerm = signal('');

  //Computed Value für gefilterte Touren basierend auf searchTerm und der Liste aller Touren im State
  filteredTours = computed(() => {
    const tours = this.state.tours() ?? [];
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) return tours;

    //Überlegen wie genau die Filter-Funktion funktionieren soll - aktuell wird nur geschaut ob der Name den searchTerm enthält
    return tours.filter((t) => t.name.toLowerCase().includes(term));
  });

  //Funktion damit beim klicken auf eine Tour im Overview die selectedTour im State verändert wird und wir zur TourDetail Route navigieren
  goToTour(tourId: number) {
    // 1. State setzen
    this.state.selectTour(tourId);

    // 2. Navigieren zur TourDetail Route
    this.router.navigate(['/dashboard/tour-detail']);
  }

  //Funktion die beim Klick auf den Button zu createtour_screen navigiert
  createTour() {}
}
