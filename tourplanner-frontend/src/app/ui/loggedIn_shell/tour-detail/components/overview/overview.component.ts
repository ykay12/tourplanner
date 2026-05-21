import { Component, Inject, signal } from '@angular/core';
import { AppStateService } from '../../../../../states/app-state.service';
import { Router } from '@angular/router';
import { JsonCreatorService } from '../../../../.../../../services/import_export/json-creator.service';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {


  showDeleteModal = signal(false)

  constructor(
    @Inject(AppStateService) public state: AppStateService, 
    public router: Router, 
    private jsonCreator: JsonCreatorService) {
  }

  openDeleteModal(): void {
    this.showDeleteModal.set(true)
  }

  closeDeleteModal(): void {
    this.showDeleteModal.set(false)
  }

onDeleteTour(): void {
  const tourId = this.state.selectedTourId();

  if (tourId === null) return;

  this.state.deleteTourFromBackend(tourId).subscribe({
    next: () => {
      this.closeDeleteModal();
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Error deleting tour:', err);
    }
  });
}

  onEditTour(): void {
    const id = this.state.selectedTourId()

    if (id === null) return

    this.router.navigate(['/dashboard/edit-tour', id])
  }

  exportTour(): void {
    /*
    Entscheidung: Tour als Json exportieren, 
    weil wir dann die Verschachtelung mit Logs und TourRoutes einfach machen können.
    
    Und unser Ziel ist ja, dass Touren exportiert und dann wieder importiert werden können.
    Nicht sie in einem schönen Format auszudrucken o.ä. daher eignet sich JSON aus meiner Sicht gut. 

    Anleitung: 
    https://www.youtube.com/watch?v=tRntgQ2urr4
    umgesetzt in: services/import_export/json-creator.service

    */
    const tourId = this.state.selectedTourId();

    if (tourId === null) return;

    // Tour aus dem State holen
    const tour = this.state
      .tours()
      .find(t => t.id === tourId);

    if (!tour) return;

    // JSON erzeugen
    const json = this.jsonCreator.createJson({ //wir übergeben ein Objekt mit Metadaten und der eigentlichen Tour, damit wir beim Importieren alle nötigen Informationen haben, um die Tour korrekt wiederherzustellen.
      version: 1, //Falls wir in zukunft Änderungen am Format vornehmen, können wir mit der Versionierung arbeiten, um die Kompatibilität zu gewährleisten. Beim Import könnten wir dann anhand der Version entscheiden, wie die Daten verarbeitet werden müssen.
      exportedAt: new Date().toISOString(),
      tour: tour
    });

    // Datei speichern
    this.jsonCreator.saveJsonToFile(
      json,
      `${tour.name}.tour.json`
    );


  }
}
