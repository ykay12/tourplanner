import { Component, Input, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { Tour } from '../../../../models/tour.model';
import { LeafletFacadeService } from '../../../../services/leaflet/leafletFacade.service';
import { Coordinates } from '../../../../models/coordinates.model';

@Component({
  selector: 'app-tour-preview',
  standalone: true,
  imports: [],
  templateUrl: './tour-preview.component.html',
  styleUrl: './tour-preview.component.scss'
})
export class TourPreviewComponent implements AfterViewInit, OnDestroy {
  @Input() tour!: Tour;

  //Funktionen für die Leaflet-Karte
  private mapFacade = inject(LeafletFacadeService);

  get mapId(): string {
    return 'map-' + this.tour.id;
  }

  //Lifecycle-Hooks für die Initialisierung der Karte -> Karte wird erst gerendert wenn ganzes DOM geladen
  async ngAfterViewInit() {
    if (!this.tour) return;

    await this.mapFacade.initMap(this.mapId); // wo kommt das her? brauche ich nicht getId()?

    const coords = this.extractCoords();
    if (!coords.length) return;

    this.mapFacade.clearMarkers(this.mapId);

    // Marker + Route
    const start = coords[0];
    this.mapFacade.setMarker(this.mapId, start);

    for (const c of coords) {
      this.mapFacade.setMarker(this.mapId, c);
    }

    this.mapFacade.drawRoute(this.mapId, coords);
    this.mapFacade.setCenterToFitCoordinates(this.mapId, coords);
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
      case 'bike': return 'bike.png';
      case 'hike': return 'hike.png';
      case 'vacation': return 'vacation.png';
      case 'mixed': return 'mixed.png';
      case 'running': return 'run.png';
      default: return 'default.png';
    }
  }

}
