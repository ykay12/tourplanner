import {
  AfterViewInit,
  Component,
  OnDestroy,
  effect,
  inject,
} from '@angular/core';

import { AppStateService } from '../../../../states/app-state.service';
import { LeafletFacadeService } from '../../../../services/leaflet/leafletFacade.service';

import { Tour } from '../../../../models/tour.model';
import { TourRoute } from '../../../../models/tourRoute.model';
import { Coordinates } from '../../../../models/coordinates.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private state = inject(AppStateService);
  private mapFacade = inject(LeafletFacadeService);

  private containerId = 'map';

  constructor() {
    //in den Unterlagen wird Effect genutzt um die Map anzupassen, aber bei uns wird die Map
    //nur verändert, nach einem rerouting, und da wird die Componente und mit ihr die Map ja komplett zerstört und neu initialisiert,
    // deshalb brauche ich hier eigentlich kein Effect, weil die Map ja sowieso jedes Mal neu gerendert wird,
    // wenn ich sie betrete, und da wird dann automatisch die aktuelle selectedTour gerendert.
    // Aber ich lasse es erstmal so, damit ich es im Hinterkopf habe, dass ich hier eigentlich kein Effect brauche,
    // und falls ich doch irgendwann mal die Map so erweitere,
    // dass sie sich auch während des Aufenthalts auf der Detailseite anpasst,
    // dann habe ich den Effect schon drin und muss ihn nicht erst noch hinzufügen
    effect(() => {
      //this.renderTourOnMap(this.state.selectedTour() as Tour);
    });
  }

  //Ich darf die Map erst initialisieren, wenn der DOM da ist, sonst crasht die Leaflet Library, weil sie das Container Element nicht findet. Deshalb AfterViewInit.
  async ngAfterViewInit() {
    await this.mapFacade.initMap(this.containerId);

    const tour = this.state.selectedTour();
    if (!tour) return;

    this.renderTourOnMap(tour);
  }

  //Beim Rerouting will ich die Map kaputt machen, damit sie neu initialisiert wird, wenn ich wieder auf der Detailseite bin. Sonst könnte es Probleme mit mehreren Map Instanzen geben, die gleichzeitig exist
  ngOnDestroy(): void {
    this.mapFacade.destroyMap?.(this.containerId);
    //ich muss this.mapReady nicht auf false setzen, weil die Komponente ja komplett zerstört wird, wenn ich sie verlasse, und wenn ich wiederkomme, wird eine neue Instanz der Komponente erstellt, in der mapReady dann automatisch wieder auf false ist
  }

  private renderTourOnMap(selectedTour: Tour) {
    const routes = selectedTour.routes;
    if (!routes.length) return;

    this.mapFacade.clearMarkers(this.containerId);

    const coords: Coordinates[] = [];

    const start = routes[0].fromCoordinates;

    if (start) {
      this.mapFacade.setMarker(this.containerId, start);
      coords.push(start);
    }

    for (const route of routes) {
      if (route.toCoordinates) {
        this.mapFacade.setMarker(this.containerId, route.toCoordinates);
        coords.push(route.toCoordinates);
      }
    }

    this.mapFacade.setCenterToFitCoordinates(this.containerId, coords);
  }
}
