import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewAssessmentComponent} from './edit-new-assessment.component';

describe('EditAddNewAssessmentComponent', () => {
  let component: EditNewAssessmentComponent ;
  let fixture: ComponentFixture<EditNewAssessmentComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditNewAssessmentComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNewAssessmentComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
