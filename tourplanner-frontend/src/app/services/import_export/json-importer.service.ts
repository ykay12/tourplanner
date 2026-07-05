import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class JsonImporterService {

  constructor() { }

  //Liest eine JSON-Datei asynchron ein, parsed sie und konvertiert sie in ein Tour-Objekt
  
  async importTourFromJsonFile(file: File): Promise<Tour> {

    const text = await file.text();

    const parsed = JSON.parse(text);

    const tourData = parsed.tour;

    return Tour.fromJson(parsed.tour);
  }

}
