import { Component, computed, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { distinct } from 'rxjs';
import { Tour, TourType } from '../../../models/tour.model';
import { Route } from '../../../models/route.model';


@Component({
  selector: 'app-createtour',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './createtour.component.html',
  styleUrl: './createtour.component.scss'
})


export class CreatetourComponent {
  tourTypes: TourType[] = ['Bike', 'Hike', 'Vacation', 'Mixed', 'Running'];
  steps = signal<string[]>(['']);


  tourName = signal('');
  tourDescription = signal('');
  from = signal('');
  to = signal('');
  tourType = signal<TourType>('Bike');
  errorMsg = signal('');

  isMixedTour = computed(() => this.tourType() === "Mixed")

  constructor(private router: Router) { }

  onTourName(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.tourName.set(value)
  }
  onTourDescription(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value
    this.tourDescription.set(value)
  }
  setTourType(type: TourType): void {
    this.tourType.set(type);
  }
  onFromInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.from.set(value);
  }

  onToInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.to.set(value);
  }

  onStepChange(index: number, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const updatedSteps = [...this.steps()];
    updatedSteps[index] = value;
    this.steps.set(updatedSteps);
  }

  addStep(): void {
    this.steps.set([...this.steps(), '']);
  }

  removeStep(index: number): void {
    const updatedSteps = this.steps().filter((_, i) => i !== index);
    this.steps.set(updatedSteps);
  }

  private validate(): boolean {
    if (!this.tourName() || !this.tourDescription() || !this.from() || !this.to()) {
      this.errorMsg.set("Please fill in all required fields.")
      return false
    }

    if (this.isMixedTour()) {
      const hasEmptySteps = this.steps().some(step => !step.trim())

      if (hasEmptySteps) {
        this.errorMsg.set("Please fill in all route steps.")
        return false
      }
    }

    this.errorMsg.set("")
    return true
  }


  private buildRoutes(): Route[] {
    if (!this.isMixedTour()) {
      return [{
        id: 0,
        from: this.from(),
        to: this.to(),
        distance: 0,
        transportMode: "Bike"
      }]
    }

    const filledSteps = this.steps().filter(step => step.trim())
    const _steps = [this.from(), ...filledSteps, this.to()]

    const routes: Route[] = []

    for (let i = 0; i < _steps.length - 1; i++) {
      routes.push({
        id: 0,
        from: _steps[i],
        to: _steps[i + 1],
        distance: 0,
        transportMode: "Bike"
      })

    }

    return routes

  }

  private buildTour(): Tour {
    return new Tour(
      0,
      this.tourName(),
      this.tourDescription(),
      0,
      0,
      false,
      this.tourType(),
      this.buildRoutes(),
      []
    )
  }
  onSubmit(): void {
    if (!this.validate()) {
      return
    }

    const tour = this.buildTour()
    console.log("Created new Tour: ", tour)

    this.router.navigate(['/dashboard'])
  }
}
