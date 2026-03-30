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

/* Component entspricht ViewModel
 Hier mediiert sie zwischen template und AppStateService und nutzt die LeafletFacadeService um die Map zu rendern.

*/
export class MapComponent implements AfterViewInit, OnDestroy {
  private state = inject(AppStateService);
  private mapFacade = inject(LeafletFacadeService);

  private containerId = 'map';

  constructor() {
    //in den Unterlagen wird Effect genutzt um die Map anzupassen, aber bei uns wird die Map
    // nur nach einem Rerouting verändert (Rerouting zerstört die Componente und die in ihr gehaltene Map)
    // deshalb brauche ich hier eigentlich kein Effect, weil die Map ja sowieso jedes Mal neu gerendert wird,
    // wenn ich sie betrete, und da wird dann automatisch die aktuelle selectedTour gerendert.
    // Aber ich lasse den leeren Effekt darweil da, als Erinnerung, falls sich mir später der Sinn erschließt
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

  //Beim Rerouting will ich die Map kaputt machen, damit sie neu initialisiert wird, wenn ich wieder auf der Detailseite bin. -> Sonst könnte es Probleme mit mehreren Map Instanzen geben, die gleichzeitig exist
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
