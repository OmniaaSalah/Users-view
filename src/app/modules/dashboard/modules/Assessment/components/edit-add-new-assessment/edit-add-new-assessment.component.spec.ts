import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddNewAssessmentComponent } from './edit-add-new-assessment.component';

describe('EditAddNewAssessmentComponent', () => {
  let component: EditAddNewAssessmentComponent;
  let fixture: ComponentFixture<EditAddNewAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddNewAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddNewAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
