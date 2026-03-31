import { TourType } from "../types/tourTypes";

export interface CreateTourFormData{
    name: string;
    description: string;
    from: string
    to: string
    tourType: TourType
    steps: string[]
}