import { TourType } from "../types/tourTypes";

// deprecated?
export interface CreateTourFormData{
    name: string;
    description: string;
    from: string
    to: string
    tourType: TourType
    steps: string[]
}