import { Component, Input } from '@angular/core';
import { Tour } from '../../../../models/tour.model';

@Component({
  selector: 'app-tour-preview',
  imports: [],
  templateUrl: './tour-preview.component.html',
  styleUrl: './tour-preview.component.scss'
})
export class TourPreviewComponent {
  @Input() tour!: Tour;

  getFrom(): string {
    return this.tour.routes?.[0]?.from ?? 'Unknown';
  }

  getTo(): string {
    const routes = this.tour.routes;
    return routes?.[routes.length - 1]?.to ?? 'Unknown';
  }

  getTourTypeIcon(): string {
    switch (this.tour.tourType) {
      case 'bike': return 'bike.png';
      case 'hike': return 'hiking.png';
      case 'car': return 'car.png';
      default: return 'default.png';
    }
  }

}
