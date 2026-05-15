import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../../models/tour.model';
import { TourMapper } from '../../mappers/tour.mapper';
import { Observable, map } from 'rxjs';
import { Log } from '../../models/log.model';



/*
External APIs schould never be accessed directly from the template,
therefore we create a facade service to encapsulate the logic.

Our own backend is also an external API from the viewpoint of our front-end
*/

@Injectable({
  providedIn: 'root',
})
export class BackendFacadeService {

  private http = inject(HttpClient); //this is needed to make a http-request
  private baseUrl = 'http://localhost:8080'; //standard-port Spring-Boot


  /*returns observable, because the http-request takes time
  so whenever it actually returns something then
  I want to change something outside the function*/
  loadToursFromUser(userId: number): Observable<Tour[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/users/${userId}/tours`)
      .pipe(map((dtoList) => TourMapper.fromDtoList(dtoList)));
  }


  //Sends a newly created tour to the backend to be saved in the database
  saveTour(newTour: Tour, userId: Number): Observable<Tour> {

    const tourDto = {
      ...newTour, user: {
        id: userId
      }
    }

    return this.http.post<any>(`${this.baseUrl}/tours`, tourDto).pipe(map((responseDto) => TourMapper.fromDto(responseDto)))

  }

  editTour(updatedTour: Tour): Observable<Tour> {

    if (updatedTour.id === null) {
      throw new Error("Cannot edit tour without id");
    }

    return this.http.put<any>(`${this.baseUrl}/tours/${updatedTour.id}`, updatedTour)
      .pipe(map((responseDto) => TourMapper.fromDto(responseDto)))
  }

  deleteTour(tourId: Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tours/${tourId}`)
  }

  loadLogsForTour(tourId: number): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.baseUrl}/tours/${tourId}/logs`);
  }

  saveLog(tourId: number, log: Log): Observable<Log> {
    return this.http.post<Log>(`${this.baseUrl}/tours/${tourId}/logs`, log);
  }

  editLog(tourId: number, log: Log): Observable<Log> {
    if (log.id === null) {
      throw new Error('Cannot edit log without id');
    }

    return this.http.put<Log>(`${this.baseUrl}/tours/${tourId}/logs/${log.id}`, log);
  }

  deleteLog(tourId: number, logId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tours/${tourId}/logs/${logId}`);
  }
}
