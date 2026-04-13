import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../../../../states/app-state.service';
import { Log } from '../../../../../models/log.model';

@Component({
  selector: 'app-create-log',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-log.component.html',
  styleUrl: './create-log.component.scss'
})
export class CreateLogComponent {
  
  // Form fields
  comment = signal('');
  date = signal(new Date().toISOString().split('T')[0]); // Today's date in YYYY-MM-DD format
  difficulty = signal(3);
  distance = signal(0);
  duration = signal(0);
  rating = signal(5);
  errorMsg = signal('');

  constructor(private appState: AppStateService) {}

  onCommentChange(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.comment.set(value);
  }

  onDateChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.date.set(value);
  }

  onDifficultyChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.difficulty.set(value);
  }

  onDistanceChange(event: Event): void {
    const value = parseFloat((event.target as HTMLInputElement).value);
    this.distance.set(value);
  }

  onDurationChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.duration.set(value);
  }

  onRatingChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.rating.set(value);
  }

  submitLog(): void {
    // Validate inputs
    if (!this.comment().trim()) {
      this.errorMsg.set('Comment is required');
      return;
    }

    if (this.distance() <= 0) {
      this.errorMsg.set('Distance must be greater than 0');
      return;
    }

    if (this.duration() <= 0) {
      this.errorMsg.set('Duration must be greater than 0');
      return;
    }

    if (this.difficulty() < 1 || this.difficulty() > 10) {
      this.errorMsg.set('Difficulty must be between 1 and 10');
      return;
    }

    if (this.rating() < 1 || this.rating() > 10) {
      this.errorMsg.set('Rating must be between 1 and 10');
      return;
    }

    // Create log object
    const newLog: Log = {
      id: 0, // Will be set by the state service
      comment: this.comment(),
      createdAt: new Date(this.date()),
      difficulty: this.difficulty(),
      total_distance: this.distance(),
      total_time: this.duration(),
      rating: this.rating()
    };

    // Add log to state
    this.appState.addLogToTour(newLog);

    // Reset form
    this.resetForm();
    this.errorMsg.set('');
  }

  resetForm(): void {
    this.comment.set('');
    this.date.set(new Date().toISOString().split('T')[0]);
    this.difficulty.set(3);
    this.distance.set(0);
    this.duration.set(0);
    this.rating.set(5);
    this.errorMsg.set('');
  }

  cancelForm(): void {
    this.resetForm();
  }
}
