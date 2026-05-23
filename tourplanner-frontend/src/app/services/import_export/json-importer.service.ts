import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class JsonImporterService {

  constructor() { }

  //Todo: Funktion die einen JSON-String entgegennimmt und in ein Tour-Objekt konvertiert.
  async importTourFromJsonFile(file: File): Promise<Tour> {

    const text = await file.text();

    const parsed = JSON.parse(text);

    const tourData = parsed.tour;

    return Tour.fromJson(parsed.tour);
  }

}
