import * as L from 'leaflet';
import { MarkerType } from './leaflet-types';

// Default Marker Fix (wichtig!)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

/**
 * Fixes the broken default Leaflet marker paths in Angular builds.
 * Must be called once BEFORE first marker is created.
 */
export function initLeafletDefaultIcons(): void {
  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });
}
