import { Component, computed, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { TourType } from '../../../types/tourTypes';
import { MixedSegment, TourRoute } from '../../../models/tourRoute.model';
import { TransportMode } from '../../../types/transportModes';
import { AppStateService } from '../../../states/app-state.service';
//import { getFakeCoordinates } from '../../../mocking/fakeViennaCoordinates'; //for faking coordinates while we don't have a real geocoding service:
import { BackendFacadeService } from '../../../services/backend/backendFacade.service';


@Component({
  selector: 'app-createtour',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './createtour.component.html',
  styleUrl: './createtour.component.scss'
})


export class CreatetourComponent {
  tourTypes: TourType[] = ['BIKE', 'HIKE', 'VACATION', 'MIXED', 'RUNNING'];
  segments = signal<MixedSegment[]>([]);
  transportModes: TransportMode[] = ["BIKE", "WALK", "RUN"]

  tourName = signal('');
  tourDescription = signal('');
  from = signal('');
  to = signal('');
  tourType = signal<TourType>('BIKE');
  errorMsg = signal('');
  transportMode = signal<TransportMode>('BIKE')
  isMixedTour = computed(() => this.tourType() === "MIXED")

  constructor(private router: Router,
    private appState: AppStateService,
    private backend: BackendFacadeService) { }


  onSubmit(): void {
    if (!this.validate()) {
      return
    }

    const tour = this.buildTour()

    //Für Debugging: Tour in Konsole loggen, bevor wir sie ans Backend schicken:
    console.log("Built Tour object to submit:", tour);

    //nicht mehr nur in den state speichern, sondern ans Backend schicken! und dann das was wir zurück bekommen in den state

    const userId = this.appState.loggedInUserId();

    if (userId === null) {
      this.errorMsg.set("Please log in to create a tour!")
      return;
    }

    this.backend.saveTour(tour, userId).subscribe({
      next: (responseTour) => {
        this.appState.addTour(responseTour);

        console.log("Created new Tour:", responseTour);

        if (responseTour.id != null) {
          this.appState.selectTour(responseTour.id);
        }
        else {
          console.warn("Received tour with null ID from backend:", responseTour);
        }

        this.router.navigate(['/dashboard/tour-detail']);
      },
      error: (err) => {
        console.error("Error creating tour:", err);
        this.errorMsg.set("Failed to create tour /save tour to db)");
      }
    });
  }

  onTourName(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.tourName.set(value)
  }
  onTourDescription(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value
    this.tourDescription.set(value)
  }
  setTourType(type: TourType): void {
    this.tourType.set(type);

    if (type !== 'MIXED') {
      this.segments.set([]);
    }

    if (this.tourType() === "HIKE" || this.tourType() === "VACATION") {
      this.transportMode.set('WALK')
    } else if (this.tourType() === "RUNNING") {
      this.transportMode.set('RUN')
    } else if (this.tourType() === "BIKE") {
      this.transportMode.set('BIKE')
    }
  }
  onFromInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.from.set(value);
  }

  onToInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.to.set(value);
  }

  onTransportModeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as TransportMode;
    this.transportMode.set(value);
  }

  onSegmentToChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    this.segments.update(segments =>
      segments.map((segment, i) =>
        i === index ? { ...segment, to: value } : segment
      )
    );
  }

  onSegmentTransportModeChange(index: number, event: Event): void {
    const value = (event.target as HTMLSelectElement).value as TransportMode;

    this.segments.update(segments =>
      segments.map((segment, i) =>
        i === index ? { ...segment, transportMode: value } : segment
      )
    );
  }

  addSegment(): void {
    this.segments.update(segments => [
      ...segments,
      { to: '', transportMode: 'BIKE' }
    ]);
  }

  removeSegment(index: number): void {
    this.segments.update(segments => segments.filter((_, i) => i !== index));
  }
  private validate(): boolean {
    if (!this.tourName() || !this.tourDescription() || !this.from() || !this.to()) {
      this.errorMsg.set("Please fill in all required fields.")
      return false
    }

    if (this.isMixedTour()) {
      const hasEmptySegments = this.segments().some(segment => !segment.to.trim());

      if (hasEmptySegments) {
        this.errorMsg.set('Please fill in all route segments.');
        return false;
      }

      if (this.segments().length === 0) {
        this.errorMsg.set('Please add at least one route segment for a mixed tour.');
        return false;
      }
    }

    this.errorMsg.set("")
    return true
  }


  private buildRoutes(): TourRoute[] {
    if (!this.isMixedTour()) {
      return [
        {
          id: null, //muss auf null gesetzt werden, damit der backendMapper weiß dass er eine neue Route anlegen muss und keine bestehende updaten soll
          from: this.from(),
          fromCoordinates: null, //werden im Backend von OpenRouteService abgefragt
          to: this.to(),
          toCoordinates: null, //werden im Backend von OpenRouteService abgefragt
          distance: 0,
          duration: 0,
          transportMode: this.transportMode()
        }
      ];
    }

    const filledSegments = this.segments().filter(segment => segment.to.trim());
    const routes: TourRoute[] = [];

    let currentFrom = this.from();

    for (let i = 0; i < filledSegments.length; i++) {
      const segment = filledSegments[i];

      routes.push({
        id: null, //muss auf null gesetzt werden, damit der backendMapper weiß dass er eine neue Route anlegen muss und keine bestehende updaten soll
        from: currentFrom,
        fromCoordinates: null, //werden im Backend von OpenRouteService abgefragt
        to: segment.to,
        toCoordinates: null, //werden im Backend von OpenRouteService abgefragt
        distance: 0,
        duration: 0,
        transportMode: segment.transportMode
      });

      currentFrom = segment.to;
    }

    routes.push({
      id: null, //muss auf null gesetzt werden, damit der backendMapper weiß dass er eine neue Route anlegen muss und keine bestehende updaten soll
      from: currentFrom,
      fromCoordinates: null, //werden im Backend von OpenRouteService abgefragt
      to: this.to(),
      toCoordinates: null, //werden im Backend von OpenRouteService abgefragt
      distance: 0,
      duration: 0,
      transportMode: filledSegments.length > 0
        ? filledSegments[filledSegments.length - 1].transportMode
        : this.transportMode()
    });

    return routes;
  }

  /*Need to fill these*/
  private buildTour(): Tour {
    return new Tour(
      null, //id is null because it will be generated by the backend when we save the tour
      this.tourName(),
      this.tourDescription(),
      0,
      0,
      false,
      this.tourType(),
      this.buildRoutes(),
      []
    )
  }


}
