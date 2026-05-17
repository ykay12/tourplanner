import { Coordinates } from "./coordinates.model";
import { TransportMode } from "../types/transportModes";


export interface TourRoute {
    id: number | null, //muss auf Null setzbar sein, damit im BackendMapper erkannt wird, wenn es sich um eine neue Route handelt die angelegt werden muss und nicht um eine bestehende die geupdatet werden soll

    from: string,
    fromCoordinates: Coordinates | null, //weil wir beim Erstellen der Tour die Coordinaten noch nicht haben -> werden im Backend von OpenRouteService abgefragt
    
    to: string,
    toCoordinates: Coordinates | null,

    routeCoordinates?: Coordinates[]; //optional, da sie nur für die Darstellung der Route auf der Karte benötigt werden und nicht für die Erstellung oder Bearbeitung einer Tour
    
    distance: number,
    duration: number,
    transportMode: TransportMode

    
}

export type MixedSegment = {
    to: string;
    transportMode: TransportMode;
};