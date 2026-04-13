/*eine spec.ts datei ist eine TypeScript-Testdatei (Specification File), 
die hauptsächlich in Angular-Projekten verwendet wird, 
um Unit-Tests für Komponenten, 
Services oder Module zu schreiben. -> Wird wohl automatisch erstellt, wenn man einen Service erstellt
*/

import { TestBed } from '@angular/core/testing';

import { AppStateService } from './app-state.service';

describe('AppStateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
