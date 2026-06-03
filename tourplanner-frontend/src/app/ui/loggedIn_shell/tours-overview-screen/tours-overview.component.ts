//tours-overview.component.ts

import { Component, signal, computed } from '@angular/core';
import { AppStateService } from '../../../states/app-state.service';
import { Router } from '@angular/router';
import { TourPreviewComponent } from './tour-preview/tour-preview.component';
import { Tour } from '../../../models/tour.model';

////////////////
// FILTER-LOGIK
////////////////
const FILTER_KEYWORDS = {
  popular: ['popular'],
  child: ['child', 'family', 'kids'],
  bike: ['bike'],
  hike: ['hike'],
  vacation: ['vacation'],
  mixed: ['mixed'],
  running: ['running'],
} as const;

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
  ) { }

  ////////////////
  // FILTER-LOGIK
  ////////////////
  searchTerm = signal(''); //Signal für Sucheingabe -> zum Filtern der Touren und für Two-Way-Binding mit der Searchbar

  //computed value, dass den SearchTerm in Filterkriterien parsed
  parsedSearch = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    return {
      raw: term,

      isPopular: matchesKeyword(term, FILTER_KEYWORDS.popular),

      isChildFriendly: matchesKeyword(term, FILTER_KEYWORDS.child),

      tourType:
        (
          Object.keys(FILTER_KEYWORDS) as Array<keyof typeof FILTER_KEYWORDS>
        ).find((key) => {
          if (key === 'popular' || key === 'child') return false;
          return matchesKeyword(term, FILTER_KEYWORDS[key]);
        }) ?? null,
    };
  });

  //computed value, das
  filteredTours = computed(() => {
    const tours = this.state.tours() ?? [];
    const term = this.searchTerm().toLowerCase().trim();

    // ich will, dass wenn die searchbar leer ist, alle Touren gezeigt werden
    if (!term) return tours;

    return tours
      .map((tour) => ({
        tour,
        score: getTourScore(tour, term),
      }))
      .filter((t) => t.score > 0) // nur relevante, aktuelle Grenze 0, könnten wir aber hochsetzen
      .sort((a, b) => b.score - a.score)
      .map((t) => t.tour);
  });

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

  //Funktion die beim Klick auf den Button zu createtour_screen navigiert
  createTour() {
    this.router.navigate(['/dashboard/createtour']);
  }
}

////////////////
// FILTER-LOGIK
////////////////

//Hilfsfunktion um teil-keywörter zu finden
function matchesKeyword(term: string, keywords: readonly string[]) {
  if (!term) return false;

  return keywords.some((k) => k.startsWith(term) || term.startsWith(k));
}

//rekursive Hilfsfunktion um zu schauen ob der SearchTerm in irgendeinem Feld der Tour vorkommt (auch in Logs und TourRoutes)
function termInTour(tour: Tour, term: string): boolean {
  const search = term.toLowerCase();

  function contains(value: unknown): boolean {
    if (value == null) return false;

    // Strings
    if (typeof value === 'string') {
      return value.toLowerCase().includes(search);
    }

    // Zahlen, Booleans
    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value).toLowerCase().includes(search);
    }

    // Datum
    if (value instanceof Date) {
      return value.toISOString().toLowerCase().includes(search);
    }

    // Arrays
    if (Array.isArray(value)) {
      return value.some(contains);
    }

    // Objekte
    if (typeof value === 'object') {
      return Object.values(value).some(contains);
    }

    return false;
  }

  return contains(tour);
}

//Hilfsfunktion die eine Score berechnet, wie sehr eine Tour dem Searchterm entspricht
function getTourScore(tour: any, term: string): number {
  let score = 0;

  const name = tour.name.toLowerCase();
  const type = tour.tourType?.toLowerCase() ?? '';

  // 1. Name Match (sehr stark)
  if (name === term) score += 100;
  if (name.includes(term)) score += 50;
  if (term && name.startsWith(term)) score += 70;

  // 2. Type Match
  if (type.includes(term)) score += 40;
  if (term && type.startsWith(term)) score += 60;

  // 3. Volltextsuche über alle Felder
  if (termInTour(tour, term)) score += 200;

  /* theoretisch könnten wir populäre Touren und kinderfreundliche Touren höher bewerten -> werden früher in der Liste angezeigt, aber das ist kein verlangtes Feature
  // 4. Popularity Boost
  if ((tour.popularity ?? 0) >= 4) score += 20;

  // 5. Child-friendly boost (wenn relevant)
  if (tour.isChildfriendly) score += 10;
  */
  return score;
}
