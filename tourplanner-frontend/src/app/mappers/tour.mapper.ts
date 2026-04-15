import { Tour } from "../models/tour.model";
import { Log } from "../models/log.model";
import { TourRoute } from "../models/tourRoute.model";

export class TourMapper {

  static fromDto(dto: any): Tour {

    const routes: TourRoute[] = dto.routes.map((r: any) => ({
      id: r.id,
      from: r.from,
      to: r.to,
      distance: r.distance,
      transportMode: r.transportMode,
      fromCoordinates: {
        lat: r.fromCoordinates?.latitude,
        lng: r.fromCoordinates?.longitude
      },
      toCoordinates: {
        lat: r.toCoordinates?.latitude,
        lng: r.toCoordinates?.longitude
      }
    }));

    const logs: Log[] = (dto.logs ?? []).map((l: any) => ({
      ...l,
      createdAt: new Date(l.createdAt)
    }));

    return new Tour(
      dto.id,
      dto.name,
      dto.description,
      dto.estimatedTime,
      dto.popularity,
      dto.childfriendly,
      dto.tourType,
      routes,
      logs
    );
  }

  static fromDtoList(dtos: any[]): Tour[] {
    return dtos.map(dto => this.fromDto(dto));
  }
}
