import { TourType } from "./tour.model";

export interface CreateTourFormData{
    name: string;
    description: string;
    from: string
    to: string
    tourType: TourType
    steps: string[]
}