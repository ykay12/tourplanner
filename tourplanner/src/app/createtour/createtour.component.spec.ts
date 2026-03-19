import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetourComponent } from './createtour.component';

describe('CreatetourComponent', () => {
  let component: CreatetourComponent;
  let fixture: ComponentFixture<CreatetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatetourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
