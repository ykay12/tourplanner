import {
  Component,
  Input,
  AfterViewInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { Tour } from '../../../../models/tour.model';
import { LeafletFacadeService } from '../../../../services/leaflet/leafletFacade.service';
import { Coordinates } from '../../../../models/coordinates.model';
import { FormatterService } from '../../../../services/formatting/formatterService.service';

@Component({
  selector: 'app-tour-preview',
  standalone: true,
  imports: [],
  templateUrl: './tour-preview.component.html',
  styleUrl: './tour-preview.component.scss',
})
export class TourPreviewComponent implements AfterViewInit, OnDestroy {
  @Input() tour!: Tour;

  //Funktionen für die Leaflet-Karte
  private mapFacade = inject(LeafletFacadeService);
  public formatter = inject(FormatterService);

  get mapId(): string {
    return 'map-' + this.tour.id;
  }

  //Lifecycle-Hooks für die Initialisierung der Karte -> Karte wird erst gerendert wenn ganzes DOM geladen
  async ngAfterViewInit() {
    if (!this.tour) return;

    await this.mapFacade.initMap(this.mapId);

    this.mapFacade.clearMarkers(this.mapId);

    const routes = this.tour.routes ?? [];
    if (!routes.length) return;

    const boundsCoords: Coordinates[] = [];

    // Startpunkt setzten
    const firstRoute = routes[0];
    if (firstRoute.fromCoordinates) {
      this.mapFacade.setMarker(this.mapId, firstRoute.fromCoordinates);
      boundsCoords.push(firstRoute.fromCoordinates);
    }

    //Routen + Endpunkte setzen / zeichnen
    for (const route of routes) {
      // Endmarker pro Segment
      if (route.toCoordinates) {
        this.mapFacade.setMarker(this.mapId, route.toCoordinates);
        boundsCoords.push(route.toCoordinates);
      }

      // detaillierte Route (nicht nur direct line)
      if (route.routeCoordinates?.length) {
        this.mapFacade.drawRoute(this.mapId, route.routeCoordinates);
      }
    }

    // Zoom auf komplette Tour
    this.mapFacade.setCenterToFitCoordinates(this.mapId, boundsCoords);
  }

  //Lifecycle-Hook für das Zerstören der Karte -> wichtig weil containerID immer gleich ist, und dann wäre schon befüllt
  ngOnDestroy(): void {
    this.mapFacade.destroyMap(this.mapId);
  }

  private extractCoords(): Coordinates[] {
    const routes = this.tour.routes ?? [];

    const coords: Coordinates[] = [];

    for (const route of routes) {
      if (route.fromCoordinates) {
        coords.push(route.fromCoordinates);
      }
    }
    // Endpunkt hinzufügen
    const last = routes[routes.length - 1]?.toCoordinates;
    if (last) {
      coords.push(last);
    }

    return coords;
  }

  //Funktionen für Generelle Infos
  getFrom(): string {
    //entspricht dem from aus dem 1. TourRoute
    return this.tour.routes?.[0]?.from ?? 'Unknown';
  }

  getTo(): string {
    //entspricht dem to aus dem letzten TourRoute
    const routes = this.tour.routes;
    return routes?.[routes.length - 1]?.to ?? 'Unknown';
  }

  //Funktionen für Icon
  getTourTypeIcon(): string {
    //export type TourType = 'Bike' | 'Hike' | 'Vacation' | 'Mixed' | 'Running';
    switch (this.tour.tourType.toLowerCase()) {
      case 'bike':
        return 'bike.png';
      case 'hike':
        return 'hike.png';
      case 'vacation':
        return 'vacation.png';
      case 'mixed':
        return 'mixed.png';
      case 'running':
        return 'run.png';
      default:
        return 'default.png';
    }
  }
}
