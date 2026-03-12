import { Log } from './log.model';
import { Route } from './route.model'

type TourType =  "Bike" | "Hike" | "Vacation" | "Mixed" | "Running"

export interface Tour{
    id: number //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?
    name: string,
    description: string,
    estimated_time: number, /*man erhält die Zeit wohl von der API in sekunden*/
    popularity: number,
    isChildfriendly: boolean,
    tourType: TourType,
    routes: Route[], //Array in Typescript funktionieren wie wir es von List<> gewöhnt sind
    logs: Log[] //Array in Typescript funktionieren wie wir es von List<> gewöhnt sind
}