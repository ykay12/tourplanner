-- =========================================
-- MOCK USERS
-- =========================================
INSERT INTO users (id, username, email, password) VALUES
                                                      (1, 'max', 'max@example.com', '1234'),
                                                      (2, 'anna', 'anna@example.com', '1234')
    ON CONFLICT (id) DO NOTHING;

-- =========================================
-- MOCK TOURS
-- =========================================
INSERT INTO tours (
    id, user_id, name, description, tour_type,
    estimated_time, popularity, is_childfriendly
) VALUES
      (1, 1, 'Vienna City Ride', 'A relaxed bike tour through Vienna.', 'Bike', 3600, 4, true),
      (2, 1, 'Mountain Hike', 'Challenging hike with great views.', 'Hike', 7200, 3, false),
      (3, 2, 'MixedTour', 'A mixed tour.', 'Mixed', 7200, 5, false)
    ON CONFLICT (id) DO NOTHING;

-- =========================================
-- MOCK ROUTES
-- =========================================
INSERT INTO routes (
    id, tour_id, route_order,
    from_location, from_lat, from_lng,
    to_location, to_lat, to_lng,
    transport_mode, distance
) VALUES
      (1, 1, 1, 'Stephansplatz', 48.2082, 16.3738, 'Prater', 48.2167, 16.4000, 'Bike', 2500),
      (2, 1, 2, 'Prater', 48.2167, 16.4000, 'Donauinsel', 48.2200, 16.4200, 'Bike', 3000),

      (3, 2, 1, 'Base Camp', 47.0707, 15.4395, 'Mid Point', 47.0800, 15.4500, 'Hike', 4000),
      (4, 2, 2, 'Mid Point', 47.0800, 15.4500, 'Summit', 47.0900, 15.4600, 'Hike', 3500),

      (5, 3, 1, 'Stephansplatz', 48.2082, 16.3738, 'Donauinsel', 48.2200, 16.4200, 'Walk', 4000),
      (6, 3, 2, 'Donauinsel', 48.2200, 16.4200, 'Hauptbahnhof', 48.1859, 16.3750, 'Hike', 3500),
      (7, 3, 3, 'Hauptbahnhof', 48.1859, 16.3750, 'Westbahnhof', 48.1965, 16.3370, 'Bike', 3500)
    ON CONFLICT (id) DO NOTHING;

-- =========================================
-- MOCK LOGS
-- =========================================
INSERT INTO logs (
    id, tour_id, comment, created_at,
    difficulty, total_distance, total_time, rating
) VALUES
    (1001, 1, 'Nice ride!', '2026-03-20 00:00:00', 2, 5500, 3600, 4)
    ON CONFLICT (id) DO NOTHING;