import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signal } from '@angular/core';
import { AppStateService } from '../../../../states/app-state.service';
import { Log } from '../../../../models/log.model';
import { Tour } from '../../../../models/tour.model';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {
  logForm: FormGroup;
  showForm = signal(false);
  editingLogId = signal<number | null>(null);

  constructor(
    @Inject(AppStateService) public state: AppStateService,
    private fb: FormBuilder
  ) {
    this.logForm = this.fb.group({
      comment: ['', Validators.required],
      difficulty: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      total_distance: ['', [Validators.required, Validators.min(0)]],
      total_time: ['', [Validators.required, Validators.min(0)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  // computed getter für selectedTour
  get tour() {
    return this.state.selectedTour();
  }

  toggleForm() {
    this.showForm.update(v => !v);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingLogId.set(null);
    this.logForm.reset();
  }

  onSubmit() {
    if (this.logForm.valid) {
      const formValue = this.logForm.value;
      const selectedTour = this.state.selectedTour();
      
      if (this.editingLogId() && selectedTour) {
        // Edit mode: update existing log
        const updatedLogs = selectedTour.logs.map(log =>
          log.id === this.editingLogId()
            ? {
                ...log,
                comment: formValue.comment,
                difficulty: parseFloat(formValue.difficulty),
                total_distance: parseFloat(formValue.total_distance),
                total_time: parseFloat(formValue.total_time),
                rating: parseFloat(formValue.rating)
              }
            : log
        );
        
        const updatedTour = new Tour(
          selectedTour.id,
          selectedTour.name,
          selectedTour.description,
          selectedTour.estimated_time,
          selectedTour.popularity,
          selectedTour.isChildfriendly,
          selectedTour.tourType,
          selectedTour.routes,
          updatedLogs
        );
        this.state.updateTour(updatedTour);
      } else {
        // Create mode: add new log
        const newLog: Log = {
          id: 0, // Will be set by the service
          comment: formValue.comment,
          createdAt: new Date(),
          difficulty: parseFloat(formValue.difficulty),
          total_distance: parseFloat(formValue.total_distance),
          total_time: parseFloat(formValue.total_time),
          rating: parseFloat(formValue.rating)
        };

        this.state.addLogToTour(newLog);
      }
      
      this.closeForm();
    }
  }

  editLog(log: Log) {
    this.editingLogId.set(log.id);
    this.logForm.patchValue({
      comment: log.comment,
      difficulty: log.difficulty.toString(),
      total_distance: log.total_distance.toString(),
      total_time: log.total_time.toString(),
      rating: log.rating.toString()
    });
    this.showForm.set(true);
  }

  deleteLog(logId: number) {
    const selectedTour = this.state.selectedTour();
    if (selectedTour) {
      const updatedLogs = selectedTour.logs.filter(log => log.id !== logId);
      const updatedTour = new Tour(
        selectedTour.id,
        selectedTour.name,
        selectedTour.description,
        selectedTour.estimated_time,
        selectedTour.popularity,
        selectedTour.isChildfriendly,
        selectedTour.tourType,
        selectedTour.routes,
        updatedLogs
      );
      this.state.updateTour(updatedTour);
    }
  }

   //collapsing on mobile:
  collapsed = signal(window.innerWidth < 768);

  toggle() {
    this.collapsed.update((v) => !v);
  }

}
