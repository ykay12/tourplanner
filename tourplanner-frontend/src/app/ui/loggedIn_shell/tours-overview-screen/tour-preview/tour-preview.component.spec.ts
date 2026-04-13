import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourPreviewComponent } from './tour-preview.component';

describe('TourPreviewComponent', () => {
  let component: TourPreviewComponent;
  let fixture: ComponentFixture<TourPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
