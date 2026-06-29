import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  secondsToHoursMinutesOrSeconds(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let result = '';

    if (hours > 0) {
      result += `${hours}h `;
    }

    if (minutes > 0) {
      result += `${minutes} min `;
    }

    if (hours === 0 && minutes === 0) {
      result += `${secs} s`;
    }

    return result.trim();
  }

  metersToKm(meters: number): string {
    if (meters < 1000) {
      return `${meters} m`;
    }
    return `${(meters / 1000).toFixed(2)} km`;
  }
}