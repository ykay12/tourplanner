import { Log } from "../models/log.model";
import { Route } from "../models/route.model";
import { TourType } from "../models/tour.model";

export type TourDto = {
    id: number;
    name: string;
    description: string;
    estimated_time: number;
    popularity: number;
    isChildfriendly: boolean;
    tourType: string;
    routes: Route[];
    logs: Array<Log & { createdAt: string }>;
}