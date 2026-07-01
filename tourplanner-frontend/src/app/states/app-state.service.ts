//app-state.service.ts

import { Injectable, computed, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Tour } from '../models/tour.model';
import { Log } from '../models/log.model';

import { BackendFacadeService } from '../services/backend/backendFacade.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private backendFacade = inject(BackendFacadeService);
  private platformId = inject(PLATFORM_ID);

  tourIdCounter = 4

  ///////////////////////////
  // Writable State (privat)
  ///////////////////////////
  private readonly _tours = signal<Tour[]>([]);
  private readonly _selectedTourId = signal<number | null>(null);
  private readonly _loggedIn = signal<boolean>(false);
  private readonly _loggedInUserId = signal<number | null>(null);

  //////////////////////////////////////////////////////////////
  // Readonly State (für Components -> die dürfen nur auslesen)
  //////////////////////////////////////////////////////////////
  readonly tours = this._tours.asReadonly();
  readonly selectedTourId = this._selectedTourId.asReadonly();
  readonly loggedIn = this._loggedIn.asReadonly();
  readonly loggedInUserId = this._loggedInUserId.asReadonly();

  //////////////////
  // Derived States
  //////////////////
  readonly selectedTour = computed<Tour | null>(() => {
    const id = this._selectedTourId();
    if (id === null) return null;
    return this._tours().find(t => t.id === id) ?? null;
  });

  constructor() {
    // Session nach Page-Refresh wiederherstellen:
    // Token liegt bereits in localStorage (gespeichert beim Login).
    // userId speichern wir ebenfalls dort, damit wir nach einem Refresh
    // den State wieder befüllen können, ohne erneut einloggen zu müssen.
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        const parsedId = Number(userId);
        this._loggedIn.set(true);
        this._loggedInUserId.set(parsedId);
        this.loadToursFromBackend(parsedId);
      }
    }
  }

  loadToursFromBackend(userId: number) {
    this.backendFacade.loadToursFromUser(userId).subscribe({
      next: (tours) => {
        this._tours.set(tours);

        if (tours.length > 0) {
          this._selectedTourId.set(tours[0].id);
        }
      },
      error: (err) => {
        console.error('Error loading tours', err);
      }
    });
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
    this._tours.update(arr => [...arr, tour]);
  }

  removeTour(id: number) {
    this._tours.update(arr => arr.filter(t => t.id !== id));

    if (this._selectedTourId() === id) {
      this._selectedTourId.set(null);
    }
  }

  deleteTourFromBackend(id: number) {
    return this.backendFacade.deleteTour(id).pipe(
      tap(() => {
        this.removeTour(id);
      })
    );
  }

  updateTour(updatedTour: Tour) {
    this._tours.update(tours =>
      tours.map(t => t.id === updatedTour.id ? updatedTour : t)
    );

    if (this._selectedTourId() === updatedTour.id) {
      this._selectedTourId.set(updatedTour.id);
    }
  }

  refreshTour(id: number) {
    return this.backendFacade.getTourById(id).pipe(
      tap((freshTour) => {
        this.updateTour(freshTour);
      })
    );
  }

  updateTourInBackend(tour: Tour) {
    return this.backendFacade.editTour(tour).pipe(
      tap((updatedTour) => {
        this.updateTour(updatedTour);
      })
    );
  }

  logUserIn(userId: number) {
    this._loggedIn.set(true);
    this._loggedInUserId.set(userId);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', String(userId));
    }

    this.loadToursFromBackend(userId);
  }

  logUserOut() {
    this._loggedIn.set(false);
    this._loggedInUserId.set(null);
    this._tours.set([]);
    this._selectedTourId.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userId');
    }
  }

  addLogToTourBackend(tourId: number, log: Log) {
    return this.backendFacade.saveLog(tourId, log).pipe(
      tap(() => {
        this.refreshTour(tourId).subscribe();
      })
    );
  }

  updateLogInBackend(tourId: number, log: Log) {
    return this.backendFacade.editLog(tourId, log).pipe(
      tap((updatedLog) => {
        this.refreshTour(tourId).subscribe();
      })
    );
  }

  deleteLogFromBackend(tourId: number, logId: number) {
    return this.backendFacade.deleteLog(tourId, logId).pipe(
      tap(() => {
        this.refreshTour(tourId).subscribe();
      })
    );
  }

}