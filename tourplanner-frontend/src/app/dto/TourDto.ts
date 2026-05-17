import { Log } from "../models/log.model";
import { TourRoute } from "../models/tourRoute.model";
import { TourType } from "../types/tourTypes";
import { TourCreationType } from "../types/tourCreationType";

export type TourDto = {
    id: number;
    name: string;
    description: string;
    estimated_time: number;
    popularity: number;
    childFriendly: boolean;
    tourType: TourType;
    creationType: TourCreationType;
    routes: TourRoute[];
    logs: Array<Log & { createdAt: string }>;

}