import { Log } from "../models/log.model";
import { TourRoute } from "../models/tourRoute.model";
import { TourType } from "../types/tourTypes";

export type TourDto = {
    id: number;
    name: string;
    description: string;
    estimated_time: number;
    popularity: number;
    isChildfriendly: boolean;
    tourType: TourType;
    routes: TourRoute[];
    logs: Array<Log & { createdAt: string }>;
}