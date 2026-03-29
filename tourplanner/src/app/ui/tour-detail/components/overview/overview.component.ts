import { Component, Inject, signal } from '@angular/core';
import { AppStateService } from '../../../../states/app-state.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {


  showDeleteModal = signal(false)

  constructor(@Inject(AppStateService) public state: AppStateService, public router: Router) {
  }

  openDeleteModal(): void {
    this.showDeleteModal.set(true)
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false)
  }

  onDeleteTour(): void {
    const tourId = this.state.selectedTourId()

    if (tourId === null) return

    this.state.removeTour(tourId)
    this.closeDeleteModal();
    this.router.navigate(['/dashboard']);

  }

  onEditTour(): void {
    const id = this.state.selectedTourId()

    if (id === null) return

    this.router.navigate(['/dashboard/edit-tour', id])
  }
}
