import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../../models/tour.model';
import { TourMapper } from '../../mappers/tour.mapper';
import { Observable, map } from 'rxjs';



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

  
  //Send a newly created tour to the backend to be saved in the database
  saveTour(newTour: Tour): Observable<Tour> {
    
    return this.http.post<any>(`${this.baseUrl}/tours`, newTour).pipe(
      map((responseDto) => TourMapper.fromDto(responseDto))
    );

  }
}
