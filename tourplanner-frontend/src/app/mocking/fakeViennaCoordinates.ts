const VIENNA_BOUNDS = {
  minLat: 48.10,
  maxLat: 48.25,
  minLng: 16.20,
  maxLng: 16.50
};

const KNOWN_LOCATIONS: Record<string, { lat: number; lng: number }> = {
  "stephansplatz": { lat: 48.2082, lng: 16.3738 },
  "prater": { lat: 48.2167, lng: 16.4000 },
  "donauinsel": { lat: 48.2200, lng: 16.4200 },
  "schonbrunn": { lat: 48.1845, lng: 16.3122 },
  "hauptbahnhof": { lat: 48.1859, lng: 16.3750 },
  "westbahnhof": { lat: 48.1965, lng: 16.3370 }
};


const locationCache = new Map<string, { lat: number; lng: number }>();

export function randomViennaCoordinate() {
  return {
    lat:
      VIENNA_BOUNDS.minLat +
      Math.random() * (VIENNA_BOUNDS.maxLat - VIENNA_BOUNDS.minLat),
    lng:
      VIENNA_BOUNDS.minLng +
      Math.random() * (VIENNA_BOUNDS.maxLng - VIENNA_BOUNDS.minLng)
  };
}

export function getFakeCoordinates(location: string | null | undefined) {
  if (!location?.trim()) {
    return randomViennaCoordinate();
  }

  const key = location.trim().toLowerCase();

  // 1. bekannte Orte zuerst
  if (KNOWN_LOCATIONS[key]) {
    return KNOWN_LOCATIONS[key];
  }

  // 2. Cache (damit neue Orte stabil bleiben)
  if (locationCache.has(key)) {
    return locationCache.get(key)!;
  }

  // 3. fallback random
  const coord = randomViennaCoordinate();
  locationCache.set(key, coord);

  return coord;
}
