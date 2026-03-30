import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Coordinates } from '../../models/coordinates.model';

/*External APIs schould never be accessed directly from the template,
therefore we create a facade service to encapsulate the logic.

Leaflet isn't actually a external API, but a JavaScript library,
However we still create a facade service to encapsulate its usage.

Responsibilities of the LeafletFacadeService:
 - talks to the external library
 - hides Leaflet-specific details
 - exposes intention-based methods

 in concrete terms:
    - holds the Maps
    - Initialize the Leaflet maps
    - Add markers to the maps
    - Adds routes to the maps
    - Handle map events (e.g., clicks, zoom changes)

*/

//type MapMode = 'Overview' | 'Details'; //So that we can distinguish between the maps on the Tours-Overview screen (where we have multiple maps) and the map on the Tour-Details screen (where we only have one map)

@Injectable({
  providedIn: 'root',
})
export class LeafletFacadeService {
  constructor() {}

  // For the Tours-Overview screen we need multiple maps, since they are the "picture" of the tour
  // I am using a Map so that I can easily access the map instance for a given containerId (which is the id of the div where the map should be rendered)
  private maps: Map<string, L.Map> = new Map();
  //private mapLastViewedTour: L.Map | null = null; //For the Tour-Details screen we only have one map, so we can store it in a separate variable, do I need to though? -> probs better to render from selectedTourId -> not two states to manage?
  
  //marker for every map, so that we can easily clear them when we need to
  private markers: Map<string, L.LayerGroup> = new Map();

  initMap(containerId: string /*mode: MapMode*/): void {
    //if we already have a map for the given containerId, we do not need to create a new one
    if (this.maps.has(containerId)) return;

    //Create the map instance
    const map = L.map(containerId, {
      zoomControl: true,
      attributionControl: true,
    });

    //Add OpenStreetMap tiles -> without it we can not see the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    //Default: Center of Vienna
    map.setView([48.2082, 16.3738], 12);

    //save the map instance for later use
    /*if(mode === 'Overview') {*/
    this.maps.set(containerId, map);
    /*} 
    else if(mode === 'Details') {
      this.mapLastViewedTour = map;
    }*/
  }

  //Set Center of Map
  setCenter(containerId: string, coordinates: Coordinates, zoom = 13): void {
    const map = this.maps.get(containerId);
    map?.setView([coordinates.lat, coordinates.lng], zoom);
  }

  //Set Marker on Map -> later "type" of marker (start, end, waypoint) and maybe even custom icons for transport modes (bike, walk, run)
  setMarker(containerId: string, coordinates: Coordinates): void {
    const map = this.maps.get(containerId);
    if (!map) return;

    L.marker([coordinates.lat, coordinates.lng]).addTo(map);
  }

  //clear all markers from the map, e.g. when we want to display a new tour on the same map -> Details screen
  clearMarkers(containerId: string): void {
    const layerGroup = this.markers.get(containerId);
    layerGroup?.clearLayers();
  }
}
