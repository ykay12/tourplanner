import { Log } from './log.model';
import { TourRoute } from './tourRoute.model';
import { TourType } from '../types/tourTypes';

export class Tour {
  id: number | null; //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?
  name: string;
  description: string;
  estimatedTime: number; /*man erhält die Zeit wohl von der API in sekunden*/
  popularity: number;
  childFriendly: boolean;
  tourType: TourType;
  routes: TourRoute[]; //Array in Typescript funktionieren wie wir es von List<> gewöhnt sind
  logs: Log[]; //Array in Typescript funktionieren wie wir es von List<> gewöhnt sind
  //Every Tour needs at least one Route because it contains the distance as well as the start and end point - jkgzdfrszwrer

  constructor(
    id: number | null,
    name: string,
    description: string,
    estimatedTime: number,
    popularity: number,
    isChildfriendly: boolean,
    tourType: TourType,
    routes: TourRoute[],
    logs: Log[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.estimatedTime = estimatedTime;
    this.popularity = popularity;
    this.childFriendly = isChildfriendly;
    this.tourType = tourType;
    this.routes = routes;
    this.logs = logs;
  }
  getStart(): string | null {
    return this.routes.length ? this.routes[0].from : null;
  }

  getEnd(): string | null {
    return this.routes.length ? this.routes[this.routes.length - 1].to : null;
  }

  getTotalDistance(): number {
    return this.routes.reduce((sum, r) => sum + r.distance, 0);
  }

  getEstimatedTime(): string {
    const hours = Math.floor(this.estimatedTime / 3600)
    const minutes = Math.floor((this.estimatedTime % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`
  }
}
