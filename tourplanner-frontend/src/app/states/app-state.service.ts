//app-state.service.ts

import { Injectable, computed, inject, signal } from '@angular/core';
import { Tour } from '../models/tour.model';
import { Log } from '../models/log.model';

import { BackendFacadeService } from '../services/backend/backendFacade.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root' //Bedeutet: Dieser Service wird auf der Root-Ebene bereitgestellt und ist damit in der gesamten Anwendung verfügbar. Es wird eine einzige Instanz dieses Services erstellt, die von allen Komponenten und anderen Services, die ihn injizieren, geteilt wird.
})
export class AppStateService {

  // brauchen wir um aus einem json lesen zu können (weil es behandelt wird als würde es im backend liegen)
  //private http = inject(HttpClient)

  //brauchen wir um Anfragen an unser Backend zu stellen
  private backendFacade = inject(BackendFacadeService);


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
    //this.loadMockToursFromJson()
    const userId = 1; // ToDo: später eigenes Signal, das beim Login befüllt wird
    //this.loadToursFromBackend(userId);
  }

  /*
  loadMockToursFromJson() {
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
  }*/

  loadToursFromBackend(userId: number) {
    this.backendFacade.loadToursFromUser(userId).subscribe({
      next: (tours) => { //wenn backend antwortet, dann: 
        this._tours.set(tours);

        if (tours.length > 0) {
          this._selectedTourId.set(tours[0].id); //selecting the first tour in the array
        }
      },
      error: (err) => {
        console.error('Error loading tours', err);
      }
    });
  }



  /* now happening in mapper and backendFacade!
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
      */
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


  updateTourInBackend(tour: Tour) {
    return this.backendFacade.editTour(tour).pipe(
      tap((updatedTour) => {
        this.updateTour(updatedTour);
      })
    );
  }

  logUserIn(userId: number) {
    this._loggedIn.set(true)
    this._loggedInUserId.set(userId)

    this.loadToursFromBackend(userId)
  }

  logUserOut() {
    this._loggedIn.set(false);
    this._loggedInUserId.set(null);
    this._tours.set([]);
    this._selectedTourId.set(null);
  }

 addLogToTourBackend(tourId: number, log: Log) {
  return this.backendFacade.saveLog(tourId, log).pipe(
    tap((savedLog) => {
      const selectedTour = this.selectedTour();
      if (!selectedTour) return;

      const updatedTour = new Tour(
        selectedTour.id,
        selectedTour.name,
        selectedTour.description,
        selectedTour.estimated_time,
        selectedTour.popularity,
        selectedTour.childFriendly,
        selectedTour.tourType,
        selectedTour.routes,
        [...selectedTour.logs, savedLog]
      );

      this.updateTour(updatedTour);
    })
  );
}

updateLogInBackend(tourId: number, log: Log) {
  return this.backendFacade.editLog(tourId, log).pipe(
    tap((updatedLog) => {
      const selectedTour = this.selectedTour();
      if (!selectedTour) return;

      const updatedLogs = selectedTour.logs.map(l =>
        l.id === updatedLog.id ? updatedLog : l
      );

      this.updateTour(new Tour(
        selectedTour.id,
        selectedTour.name,
        selectedTour.description,
        selectedTour.estimated_time,
        selectedTour.popularity,
        selectedTour.childFriendly,
        selectedTour.tourType,
        selectedTour.routes,
        updatedLogs
      ));
    })
  );
}

deleteLogFromBackend(tourId: number, logId: number) {
  return this.backendFacade.deleteLog(tourId, logId).pipe(
    tap(() => {
      const selectedTour = this.selectedTour();
      if (!selectedTour) return;

      const updatedLogs = selectedTour.logs.filter(log => log.id !== logId);

      this.updateTour(new Tour(
        selectedTour.id,
        selectedTour.name,
        selectedTour.description,
        selectedTour.estimated_time,
        selectedTour.popularity,
        selectedTour.childFriendly,
        selectedTour.tourType,
        selectedTour.routes,
        updatedLogs
      ));
    })
  );
}

}

