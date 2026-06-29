import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { signal } from '@angular/core';
import { AppStateService } from '../../../../../states/app-state.service';
import { Log } from '../../../../../models/log.model';
import { Tour } from '../../../../../models/tour.model';
import { FormatterService } from '../../../../../services/formatting/formatterService.service';

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
    private fb: FormBuilder,
    public formatter: FormatterService
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
    if (!this.logForm.valid) return;

    const formValue = this.logForm.value;
    const selectedTour = this.state.selectedTour();

    if (!selectedTour || selectedTour.id === null) return;

    if (this.editingLogId()) {
      const existingLog = selectedTour.logs.find(log => log.id === this.editingLogId());

      if (!existingLog) return;

      const updatedLog: Log = {
        ...existingLog,
        comment: formValue.comment,
        difficulty: parseFloat(formValue.difficulty),
        totalDistance: parseFloat(formValue.total_distance),
        totalTime: parseFloat(formValue.total_time),
        rating: parseFloat(formValue.rating)
      };

      this.state.updateLogInBackend(selectedTour.id, updatedLog).subscribe({ //Funktion im AppStateService die ein Observable zurückgibt
        next: () => this.closeForm(), //next läuft, nachdem, dass Observable (ein Log) zurückgekommen ist
        error: err => console.error('Error updating log:', err)
      });

      return;
    }

    const newLog: Log = {
      id: null,
      comment: formValue.comment,
      createdAt: new Date(),
      difficulty: parseFloat(formValue.difficulty),
      totalDistance: parseFloat(formValue.total_distance),
      totalTime: parseFloat(formValue.total_time),
      rating: parseFloat(formValue.rating)
    };

    this.state.addLogToTourBackend(selectedTour.id, newLog).subscribe({
      next: () => this.closeForm(),
      error: err => console.error('Error creating log:', err)
    });
  }

  editLog(log: Log) {
    this.editingLogId.set(log.id);
    this.logForm.patchValue({
      comment: log.comment,
      difficulty: log.difficulty.toString(),
      total_distance: log.totalDistance.toString(),
      total_time: log.totalTime.toString(),
      rating: log.rating.toString()
    });
    this.showForm.set(true);
  }

  deleteLog(logId: number) {
    const selectedTour = this.state.selectedTour();

    if (!selectedTour || selectedTour.id === null) return;

    this.state.deleteLogFromBackend(selectedTour.id, logId).subscribe({
      error: err => console.error('Error deleting log:', err)
    });
  }

  //collapsing on mobile:
  collapsed = signal(window.innerWidth < 768);

  toggle() {
    this.collapsed.update((v) => !v);
  }
}
