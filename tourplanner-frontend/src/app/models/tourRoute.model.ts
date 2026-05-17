import { Coordinates } from "./coordinates.model";
import { TransportMode } from "../types/transportModes";
import { TourCreationType } from "../types/tourCreationType";

export interface TourRoute {
    id: number | null, //muss auf Null setzbar sein, damit im BackendMapper erkannt wird, wenn es sich um eine neue Route handelt die angelegt werden muss und nicht um eine bestehende die geupdatet werden soll

    from: string,
    fromCoordinates: Coordinates | null, //weil wir beim Erstellen der Tour die Coordinaten noch nicht haben -> werden im Backend von OpenRouteService abgefragt
    
    to: string,
    toCoordinates: Coordinates | null,
    
    distance: number,
    transportMode: TransportMode,
    creationType: TourCreationType
}

export type MixedSegment = {
    to: string;
    transportMode: TransportMode;
};