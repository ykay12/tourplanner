import { Log } from './log.model';
import { Route } from './route.model';

type TourType = 'Bike' | 'Hike' | 'Vacation' | 'Mixed' | 'Running';

export class Tour {
  id: number; //Wir haben uns noch nicht geeinigt wie wir die ID anlegen wollen number/string/UUID?
  name: string;
  description: string;
  estimated_time: number; /*man erhält die Zeit wohl von der API in sekunden*/
  popularity: number;
  isChildfriendly: boolean;
  tourType: TourType;
  routes: Route[]; //Array in Typescript funktionieren wie wir es von List<> gewöhnt sind
  logs: Log[]; //Array in Typescript funktionieren wie wir es von List<> gewöhnt sind
  //Every Tour needs at least one Route because it contains the distance as well as the start and end point

  constructor(
    id: number,
    name: string,
    description: string,
    estimated_time: number,
    popularity: number,
    isChildfriendly: boolean,
    tourType: TourType,
    routes: Route[],
    logs: Log[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.estimated_time = estimated_time;
    this.popularity = popularity;
    this.isChildfriendly = isChildfriendly;
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
}
