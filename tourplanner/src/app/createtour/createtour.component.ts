import { Component, signal, Signal } from '@angular/core';


type TourType = "bike" | "hike" | "run" | "vacation" | "mixed"

@Component({
  selector: 'app-createtour',
  imports: [],
  standalone: true,
  templateUrl: './createtour.component.html',
  styleUrl: './createtour.component.scss'
})


export class CreatetourComponent {
  tourTypes: TourType[] = ['bike', 'hike', 'run', 'vacation', 'mixed']; steps = signal<string[]>(['']);


  tourName = signal('');
  tourDescription = signal('');
  from = signal('');
  to = signal('');
  tourType = signal<TourType>('bike');

  constructor() { }

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
}
