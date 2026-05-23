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

  static fromJson(data: any): Tour {
    //In this Function I am setting all IDs to null because the Tour will be saved to the database as a new Tour and otherwise I will have conficts! (ID == primary key in database)
    return new Tour(
      null, 

      data.name,
      data.description,
      data.estimatedTime,
      data.popularity,
      data.childFriendly,
      data.tourType,

      data.routes.map((route: any) => ({
        ...route,
        id: null
      })),

      data.logs.map((log: any) => ({
        ...log,
        id: null
      }))
    );
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

  getFormattedDistance(): string {
    const distance = this.getTotalDistance();

    if (distance < 1000) {
      return `${distance} m`;
    }
    return `${(distance / 1000).toFixed(2)} km`;
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
