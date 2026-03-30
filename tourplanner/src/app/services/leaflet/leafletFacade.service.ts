import { isPlatformBrowser } from '@angular/common';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';

import { Coordinates } from '../../models/coordinates.model';

//import * as L from 'leaflet'; //Das darf ich nicht machen, weil Angular dann versucht die Library auf dem Server zu laden -> das darf aber nur im Browser passieren (SSR geht mit Leaflet nicht)


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
  //für SSR muss ich prüfen ob wir im Browser sind!
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  //leaflet dynamisch laden -> sonst fehler in Browser
  private L: typeof import('leaflet') | null = null;

  // For the Tours-Overview screen we need multiple maps, since they are the "picture" of the tour
  // I am using a Map<> so that I can easily access the map instance for a given containerId (which is the id of the div where the map should be rendered)
  private maps: Map<string, any> = new Map();
  private markers: Map<string, any> = new Map(); //marker for every map, (I need to remember them to clear them)


  //This function is needed to load the Leaflet library dynamically (in the Browser)
  private async loadLeaflet() {
    if (!this.isBrowser) return null;

    if (!this.L) {
      const leaflet = await import('leaflet');

      // telling Leaflet where to find the marker icons
      const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
      const iconUrl = 'assets/leaflet/marker-icon.png';
      const shadowUrl = 'assets/leaflet/marker-shadow.png';

      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;

      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
      });

      this.L = leaflet;
    }

    return this.L;
  }

  async initMap(containerId: string): Promise<void> {
    //DEBUGGING-START
    console.log('🗺️ initMap called', containerId);
    //DEBUGGING-END

    // I need to check if we are in the browser, because Leaflet does not work on the server and Angular Universal also tries to render the app on the server -> otherwise we would get errors when trying to initialize the map on the server -> because there is no "window" object on the server, which Leaflet tries to access when initializing the map
    if (!this.isBrowser) return;
    //if we already have a map for the given containerId, we do not need to create a new one
    if (this.maps.has(containerId)) return;

    const L = await this.loadLeaflet();
    if (!L) return; //falls Leaflet nicht geladen werden konnte, z.B. weil wir nicht im Browser sind, dann brechen wir die Initialisierung der Map ab, damit es nicht zu Fehlern kommt

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

    this.maps.set(containerId, map);
  }

  //Set Marker on Map -> later "type" of marker (start, end, waypoint) and maybe even custom icons for transport modes (bike, walk, run)
  async setMarker(
    containerId: string,
    coordinates: Coordinates,
  ): Promise<void> 
  {
    //DEBUGGING-START
    console.log('📍 setMarker called', coordinates);
    //DEBUGGING-END

    const L = await this.loadLeaflet();
    if (!L) return;

    const map = this.maps.get(containerId);
    if (!map) return;

    let layerGroup = this.markers.get(containerId);

    if (!layerGroup) {
      layerGroup = L.layerGroup().addTo(map);
      this.markers.set(containerId, layerGroup);
    }

    //Leaflet funktion zum setzen eines Markers
    L.marker([coordinates.lat, coordinates.lng]).addTo(layerGroup);
  }

  //clear all markers from the map, e.g. when we want to display a new tour on the same map -> Details screen
  // actually not needed right now -> but if we had a map that was dependent on a signal, that changes while on the same screen
  clearMarkers(containerId: string): void {
    const layerGroup = this.markers.get(containerId);
    layerGroup?.clearLayers();
  }

  destroyMap(containerId: string): void {
    //DEBUGGING-START
    console.log('🗑️ destroyMap called', containerId);
    //DEBUGGING-END
    const map = this.maps.get(containerId);
    if (map) {
      map.remove();
      this.maps.delete(containerId);
    }

    this.markers.delete(containerId);
  }

  async setCenterToFitCoordinates(
    containerId: string,
    coordinates: Coordinates[],
  ): Promise<void> {
    if (!this.isBrowser) return;

    const L = await this.loadLeaflet();
    if (!L) return;

    const map = this.maps.get(containerId);
    if (!map) return;

    if (!coordinates.length) return;

    const bounds = L.latLngBounds(coordinates.map((c) => [c.lat, c.lng]));

    map.fitBounds(bounds, {
      padding: [50, 50], 
      maxZoom: 15, // verhindert zu starken Zoom
      animate: true,
    });
  }
}
