import { Injectable, computed, signal } from '@angular/core';
import { Tour } from './features/tours/models/tour.model';
import { Log } from './features/tours/models/log.model';
import { Route } from './features/tours/models/route.model';

@Injectable({
  providedIn: 'root'
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
function seedTours(): Tour[] {
  return [
    {
      id: 1,
      name: "Donauinsel Runde",
      description: "Eine entspannte Fahrradtour entlang der Donauinsel.",
      estimated_time: 7200,
      popularity: 4,
      isChildfriendly: true,
      tourType: "Bike",
      routes: seedRoutes(),
      logs: seedLogs()
    },
    {
      id: 2,
      name: "Rax Wanderung",
      description: "Schöne Wanderung auf der Rax mit toller Aussicht.",
      estimated_time: 14400,
      popularity: 5,
      isChildfriendly: false,
      tourType: "Hike",
      routes: [],
      logs: []
    },
    {
      id: 3,
      name: "Stadtlauf Wien",
      description: "Running Tour durch die Wiener Innenstadt.",
      estimated_time: 3600,
      popularity: 3,
      isChildfriendly: true,
      tourType: "Running",
      routes: [],
      logs: []
    }
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


