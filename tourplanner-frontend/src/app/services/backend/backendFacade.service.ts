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
  //what for?
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080';

  loadToursFromUser(userId: number): Observable<Tour[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/users/${userId}/tours`)
      .pipe(map((dtoList) => TourMapper.fromDtoList(dtoList)));
  }
}
