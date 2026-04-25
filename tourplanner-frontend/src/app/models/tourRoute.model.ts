import { Coordinates } from "./coordinates.model";
import { TransportMode } from "../types/transportModes";

export interface TourRoute {
    id: number | null, //muss auf Null setzbar sein, damit im BackendMapper erkannt wird, wenn es sich um eine neue Route handelt die angelegt werden muss und nicht um eine bestehende die geupdatet werden soll

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