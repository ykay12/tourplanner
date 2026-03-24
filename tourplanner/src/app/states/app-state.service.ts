import { Injectable, computed, signal } from '@angular/core';

import { Tour } from '../models/tour.model';
import { Log } from '../models/log.model';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root' //Bedeutet: Dieser Service wird auf der Root-Ebene bereitgestellt und ist damit in der gesamten Anwendung verfügbar. Es wird eine einzige Instanz dieses Services erstellt, die von allen Komponenten und anderen Services, die ihn injizieren, geteilt wird.
})
export class AppStateService {

  // Writable State (privat)
  private readonly _tours = signal<Tour[]>(seedTours());
  private readonly _selectedTourId = signal<number | null>(null);

  // Readonly State (für Components -> die dürfen nur auslesen)
  readonly tours = this._tours.asReadonly();
  readonly selectedTourId = this._selectedTourId.asReadonly();

  // Derived State
  readonly selectedTour = computed<Tour | null>(() => { //ToDo: warum ist selected Tour computed?
    const id = this._selectedTourId();
    if (id === null) return null;

    return this._tours().find(t => t.id === id) ?? null;
  });

  constructor() {
    // nur für Test
    if (this._tours().length > 0) {
      this._selectedTourId.set(this._tours()[0].id);
    }
  }

  // Intent Methods (State ändern)
  selectTour(id: number) {
    this._selectedTourId.set(id);
  }

  clearSelection() {
    this._selectedTourId.set(null);
  }

  addTour(tour: Tour) {
    this._tours.update(arr => [...arr, tour]);
  }

  removeTour(id: number) {
    this._tours.update(arr => arr.filter(t => t.id !== id));

    if (this._selectedTourId() === id) {
      this._selectedTourId.set(null);
    }
  }

}


//Funktionen um Mock-Daten zu erstellen
export function seedTours(): Tour[] {
  return [
    new Tour(
      1,
      "Donauinsel Runde",
      "Eine entspannte Fahrradtour entlang der Donauinsel.",
      7200,   // estimated_time
      4,      // popularity
      true,   // isChildfriendly
      "Bike", // tourType
      seedRoutes(),
      seedLogs()
    ),
    new Tour(
      2,
      "Rax Wanderung",
      "Schöne Wanderung auf der Rax mit toller Aussicht.",
      14400,
      5,
      false,
      "Hike",
      [ // 1 Route
        { id: 4, from: "Hauptplatz", to: "Rax Gipfel", distance: 12000, transportMode: "Walk" }
      ],     
      [ // Zumindest 1 Log
        {
          id: 4,
          createdAt: new Date(),
          comment: "Tolle Aussicht, anstrengend aber lohnend.",
          difficulty: 4,
          total_distance: 12000,
          total_time: 14400,
          rating: 5
        }
      ]      
    ),
    new Tour(
      3,
      "Stadtlauf Wien",
      "Running Tour durch die Wiener Innenstadt.",
      3600,
      3,
      true,
      "Running",
      [ //jede Tour braucht mindestens eine Route,
        { id: 5, from: "Stephansplatz", to: "Rathausplatz", distance: 5000, transportMode: "Run" }
      ],     
      //keine Logs zum testen -> kann ja vorkommen, dass eine Tour noch keine logs hat
      []      
    )
  ];
}

function seedLogs(): Log[] {
  return [
    {
      id: 1,
      createdAt: new Date(),
      comment: "Sehr schöne Strecke entlang der Donau.",
      difficulty: 2,
      total_distance: 11500,
      total_time: 7200,
      rating: 4
    },
    {
      id: 2,
      createdAt: new Date(),
      comment: "Perfekt für eine entspannte Fahrradtour.",
      difficulty: 1,
      total_distance: 11500,
      total_time: 6800,
      rating: 5
    },
    {
      id: 3,
      createdAt: new Date(),
      comment: "Teilweise viel Wind, aber tolle Aussicht.",
      difficulty: 3,
      total_distance: 11500,
      total_time: 7500,
      rating: 4
    }
  ];
}



function seedRoutes(): Route[] {
  return [
    {
      id: 1,
      from: "Donauinsel Nord",
      to: "Floridsdorfer Brücke",
      distance: 3500,
      transportMode: "Bike"
    },
    {
      id: 2,
      from: "Floridsdorfer Brücke",
      to: "Reichsbrücke",
      distance: 4200,
      transportMode: "Bike"
    },
    {
      id: 3,
      from: "Reichsbrücke",
      to: "Donauinsel Süd",
      distance: 3800,
      transportMode: "Bike"
    }
  ];
}


