//app-state.service.ts

import { Injectable, computed, inject, signal } from '@angular/core';

import { Tour, TourType } from '../models/tour.model';
import { Log } from '../models/log.model';
import { TourRoute } from '../models/tourRoute.model';
import { HttpClient } from '@angular/common/http';
import { TourDto } from '../dto/TourDto';
import { dot } from 'node:test/reporters';

@Injectable({
  providedIn: 'root' //Bedeutet: Dieser Service wird auf der Root-Ebene bereitgestellt und ist damit in der gesamten Anwendung verfügbar. Es wird eine einzige Instanz dieses Services erstellt, die von allen Komponenten und anderen Services, die ihn injizieren, geteilt wird.
})
export class AppStateService {

  // brauchen wir um aus einem json lesen zu können (weil es behandelt wird als würde es im backend liegen)
  private http = inject(HttpClient)

  tourIdCounter = 4 // wir haben im json aktuell 3, ist mal nur hardcoded

  ///////////////////////////
  // Writable State (privat)
  ///////////////////////////
  /*
  As Signals, weil:
    - Signals den Überblick behalten, wer von ihnen abhängt 
    - wenn sich ihr value ändert dort automatisch updates triggern
    - sie sind "synchronous" -> wenn ich setze, dass die selectedTourId 2 ist, dann ist sie sofort 2 und nicht erst nach einer kurzen Zeit (wie es bei Observables der Fall sein könnte)
  */
  private readonly _tours = signal<Tour[]>([]);
  private readonly _selectedTourId = signal<number | null>(null);

  //////////////////////////////////////////////////////////////  
  // Readonly State (für Components -> die dürfen nur auslesen)
  //////////////////////////////////////////////////////////////
  readonly tours = this._tours.asReadonly();
  readonly selectedTourId = this._selectedTourId.asReadonly();

  //////////////////
  // Derived State
  //////////////////
  readonly selectedTour = computed<Tour | null>(() => {
    const id = this._selectedTourId();
    if (id === null) return null;

    return this._tours().find(t => t.id === id) ?? null;
  });


  constructor() {
    // nur für Test

    // if (this._tours().length > 0) { //wenn wir das auskommentieren, dann wird bei der Route keine slectedTour Angezeigt
    //   this._selectedTourId.set(this._tours()[0].id);
    // }

    this.loadMockTours()

  }

  loadMockTours() {
    this.http.get<TourDto[]>('assets/mocks/tours.json').subscribe({
      next: (data) => {
        const tours = data.map(dto => this.mapDtoToTour(dto))
        this._tours.set(tours)

        if (tours.length > 0) {
          this._selectedTourId.set(tours[0].id)
        }
      },
      error: (e) => {
        console.log("Error while loading Mock-Tours", e)
      }
    })
  }


  private mapDtoToTour(dto: TourDto): Tour {
    const logs: Log[] = dto.logs.map(log => ({
      ...log, createdAt: new Date(log.createdAt)
    }))


    return new Tour(
      dto.id,
      dto.name,
      dto.description,
      dto.estimated_time,
      dto.popularity,
      dto.isChildfriendly,
      dto.tourType as TourType,
      dto.routes,
      logs
    )

  }
  /////////////////////////////////
  // Intent Methods (State ändern)
  /////////////////////////////////
  selectTour(id: number) {
    this._selectedTourId.set(id);
  }

  clearSelection() {
    this._selectedTourId.set(null);
  }

  addTour(tour: Tour) {
    tour.id = this.tourIdCounter++
    this._tours.update(arr => [...arr, tour]);
  }

  removeTour(id: number) {
    this._tours.update(arr => arr.filter(t => t.id !== id));

    if (this._selectedTourId() === id) {
      this._selectedTourId.set(null);
    }
  }
  updateTour(updatedTour: Tour) {
    this._tours.update(tours =>
      tours.map(t => t.id === updatedTour.id ? updatedTour : t)
    );

    if (this._selectedTourId() === updatedTour.id) {
      this._selectedTourId.set(updatedTour.id);
    }
  }

}

