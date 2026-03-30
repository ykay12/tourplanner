import { from } from "rxjs";
import { Coordinates } from "./coordinates.model";

export type TransportMode = "Bike" | "Walk" | "Run"

export interface TourRoute {
    id: number, //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?

    from: string,
    fromCoordinates: Coordinates | null, //weil wir beim Erstellen der Tour die Coordinaten noch nicht haben
    
    to: string,
    toCoordinates: Coordinates | null,
    
    distance: number,
    transportMode: TransportMode
}

export type MixedSegment = {
    to: string;
    transportMode: TransportMode;
};