import { Coordinates } from "./coordinates.model";
import { TransportMode } from "../types/transportModes";

export interface TourRoute {
    id: number, //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?

    from: string,
    fromCoordinates: Coordinates | null, //weil wir beim Erstellen der Tour die Coordinaten noch nicht haben -> bzw werden sie im Moment durch random Koordinaten in Wien gemocked
    
    to: string,
    toCoordinates: Coordinates | null,
    
    distance: number,
    transportMode: TransportMode
}

export type MixedSegment = {
    to: string;
    transportMode: TransportMode;
};