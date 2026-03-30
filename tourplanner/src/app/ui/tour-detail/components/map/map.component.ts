import { Component, effect, inject } from '@angular/core';

import { AppStateService } from '../../../../states/app-state.service';
import { LeafletFacadeService } from '../../../../services/leaflet/leafletFacade.service';

import { Tour } from '../../../../models/tour.model';
import { TourRoute } from '../../../../models/tourRoute.model';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  private state = inject(AppStateService);
  private mapFacade = inject(LeafletFacadeService);

  private containerId = 'map';

  constructor() {
    // initialize the map
    this.mapFacade.initMap(this.containerId);

    // react to changes in the selected tour and update the map accordingly
    effect(() => {
      const selectedTour = this.state.selectedTour();

      if (!selectedTour) {
        return;
      }

      // if we have a selected tour, I want to add a marker for every 
    });
  }
}
