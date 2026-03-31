import { Component, Input } from '@angular/core';
import { Tour } from '../../../../models/tour.model';

@Component({
  selector: 'app-tour-preview',
  standalone: true,
  imports: [],
  templateUrl: './tour-preview.component.html',
  styleUrl: './tour-preview.component.scss'
})
export class TourPreviewComponent {
  @Input() tour!: Tour;

  
  getFrom(): string {
    //entspricht dem from aus dem 1. TourRoute
    return this.tour.routes?.[0]?.from ?? 'Unknown';
  }

  getTo(): string {
    //entspricht dem to aus dem letzten TourRoute
    const routes = this.tour.routes;
    return routes?.[routes.length - 1]?.to ?? 'Unknown';
  }


  getTourTypeIcon(): string {
    //export type TourType = 'Bike' | 'Hike' | 'Vacation' | 'Mixed' | 'Running';
    switch (this.tour.tourType.toLowerCase()) {
      case 'bike': return 'bike.png';
      case 'hike': return 'hike.png';
      case 'vacation': return 'vacation.png';
      case 'mixed': return 'mixed.png';
      case 'running': return 'run.png';
      default: return 'default.png';
    }
  }

}
