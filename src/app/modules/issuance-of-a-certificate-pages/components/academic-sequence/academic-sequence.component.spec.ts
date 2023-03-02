import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicSequenceComponent } from './academic-sequence.component';

describe('AcademicSequenceComponent', () => {
  let component: AcademicSequenceComponent;
  let fixture: ComponentFixture<AcademicSequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicSequenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
