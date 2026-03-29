import { Component, computed, inject, signal } from '@angular/core';
import { MixedSegment, Route, TransportMode } from '../../../models/route.model';
import { AppStateService } from '../../../states/app-state.service';
import { Tour, TourType } from '../../../models/tour.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-edit-tour',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-tour.component.html',
  styleUrl: './edit-tour.component.scss'
})
export class EditTourComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly appState = inject(AppStateService);

  tourTypes: TourType[] = ['Bike', 'Hike', 'Vacation', 'Mixed', 'Running'];
  transportModes: TransportMode[] = ['Bike', 'Walk', 'Run'];

  segments = signal<MixedSegment[]>([]);

  tourId = signal<number | null>(null);
  tourName = signal('');
  tourDescription = signal('');
  from = signal('');
  to = signal('');
  tourType = signal<TourType>('Bike');
  transportMode = signal<TransportMode>('Bike');
  errorMsg = signal('');

  isMixedTour = computed(() => this.tourType() === 'Mixed');


  constructor() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMsg.set('No valid tour id found.');
      return;
    }

    this.tourId.set(id);
    this.appState.selectTour(id);

    const tour = this.appState.selectedTour();

    if (!tour) {
      this.errorMsg.set('Tour not found.');
      return;
    }

    this.fillForm(tour);
  }

  private fillForm(tour: Tour): void {
    this.tourName.set(tour.name);
    this.tourDescription.set(tour.description);
    this.tourType.set(tour.tourType);

    const routes = tour.routes ?? [];

    if (routes.length > 0) {
      this.from.set(routes[0].from);
      this.to.set(routes[routes.length - 1].to);
    }

    if (tour.tourType === 'Mixed') {
      const middleRoutes = routes.slice(0, -1);

      this.segments.set(
        middleRoutes.map(route => ({
          to: route.to,
          transportMode: route.transportMode
        }))
      );
    } else {
      this.transportMode.set(routes[0]?.transportMode ?? 'Bike');
      this.segments.set([]);
    }
  }


  onTourName(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.tourName.set(value);
  }

  onTourDescription(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.tourDescription.set(value);
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
    if (
      !this.tourName().trim() ||
      !this.tourDescription().trim() ||
      !this.from().trim() ||
      !this.to().trim()
    ) {
      this.errorMsg.set('Please fill in all required fields.');
      return false;
    }

    if (this.isMixedTour()) {
      if (this.segments().length === 0) {
        this.errorMsg.set('Please add at least one route segment for a mixed tour.');
        return false;
      }

      const hasEmptySegments = this.segments().some(segment => !segment.to.trim());

      if (hasEmptySegments) {
        this.errorMsg.set('Please fill in all route segments.');
        return false;
      }
    }

    this.errorMsg.set('');
    return true;
  }

  private buildRoutes(): Route[] {
    if (!this.isMixedTour()) {
      return [
        {
          id: 0,
          from: this.from(),
          to: this.to(),
          distance: 0,
          transportMode: this.transportMode()
        }
      ];
    }

    const filledSegments = this.segments().filter(segment => segment.to.trim());
    const routes: Route[] = [];

    let currentFrom = this.from();

    for (let i = 0; i < filledSegments.length; i++) {
      const segment = filledSegments[i];

      routes.push({
        id: i,
        from: currentFrom,
        to: segment.to,
        distance: 0,
        transportMode: segment.transportMode
      });

      currentFrom = segment.to;
    }

    routes.push({
      id: filledSegments.length,
      from: currentFrom,
      to: this.to(),
      distance: 0,
      transportMode:
        filledSegments.length > 0
          ? filledSegments[filledSegments.length - 1].transportMode
          : 'Bike'
    });

    return routes;
  }

  private buildUpdatedTour(oldTour: Tour): Tour {
    return new Tour(
      oldTour.id,
      this.tourName(),
      this.tourDescription(),
      oldTour.estimated_time,
      oldTour.popularity,
      oldTour.isChildfriendly,
      this.tourType(),
      this.buildRoutes(),
      oldTour.logs
    );
  }

  onSubmit(): void {
    if (!this.validate()) return;

    const currentTour = this.appState.selectedTour();
    if (!currentTour) {
      this.errorMsg.set('Tour not found.');
      return;
    }

    const updatedTour = this.buildUpdatedTour(currentTour);
    this.appState.updateTour(updatedTour);

    this.router.navigate(['/dashboard/tour-detail']);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/tour-detail']);
  }
}