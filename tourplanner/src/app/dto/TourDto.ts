import { Log } from "../models/log.model";
import { TourRoute } from "../models/tourRoute.model";
import { TourType } from "../models/tour.model";

export type TourDto = {
    id: number;
    name: string;
    description: string;
    estimated_time: number;
    popularity: number;
    isChildfriendly: boolean;
    tourType: string;
    routes: TourRoute[];
    logs: Array<Log & { createdAt: string }>;
}