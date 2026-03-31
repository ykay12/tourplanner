import { Component, computed, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tour } from '../../../models/tour.model';
import { TourType } from '../../../types/tourTypes';
import { MixedSegment, TourRoute } from '../../../models/tourRoute.model';
import { TransportMode } from '../../../types/transportModes';
import { AppStateService } from '../../../states/app-state.service';
//for faking coordinates while we don't have a real geocoding service:
import { getFakeCoordinates } from '../../../mocking/fakeViennaCoordinates';


@Component({
  selector: 'app-createtour',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './createtour.component.html',
  styleUrl: './createtour.component.scss'
})


export class CreatetourComponent {
  tourTypes: TourType[] = ['Bike', 'Hike', 'Vacation', 'Mixed', 'Running'];
  segments = signal<MixedSegment[]>([]);
  transportModes: TransportMode[] = ["Bike", "Walk", "Run"]

  tourName = signal('');
  tourDescription = signal('');
  from = signal('');
  to = signal('');
  tourType = signal<TourType>('Bike');
  errorMsg = signal('');
  transportMode = signal<TransportMode>('Bike')
  isMixedTour = computed(() => this.tourType() === "Mixed")

  constructor(private router: Router, private appState: AppStateService) { }

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

    if (type !== 'Mixed') {
      this.segments.set([]);
    }

    if (this.tourType() === "Hike" || this.tourType() === "Vacation") {
      this.transportMode.set('Walk')
    } else if (this.tourType() === "Running") {
      this.transportMode.set('Run')
    } else if (this.tourType() === "Bike") {
      this.transportMode.set('Bike')
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
      { to: '', transportMode: 'Bike' }
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
          id: 0,
          from: this.from(),
          fromCoordinates: getFakeCoordinates(this.from()),
          to: this.to(),
          toCoordinates: getFakeCoordinates(this.to()),
          distance: 0,
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
        id: i,
        from: currentFrom,
        fromCoordinates: getFakeCoordinates(currentFrom),
        to: segment.to,
        toCoordinates: getFakeCoordinates(segment.to),
        distance: 0,
        transportMode: segment.transportMode
      });

      currentFrom = segment.to;
    }

    routes.push({
      id: filledSegments.length,
      from: currentFrom,
      fromCoordinates: getFakeCoordinates(currentFrom),
      to: this.to(),
      toCoordinates: getFakeCoordinates(this.to()),
      distance: 0,
      transportMode: filledSegments.length > 0
        ? filledSegments[filledSegments.length - 1].transportMode
        : this.transportMode()
    });

    return routes;
  }

  private buildTour(): Tour {
    return new Tour(
      0,
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
  onSubmit(): void {
    if (!this.validate()) {
      return
    }

    const tour = this.buildTour()
    this.appState.addTour(tour)
    console.log("Created new Tour: ", tour)

    this.router.navigate(['/dashboard'])
  }
}
