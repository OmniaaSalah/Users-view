import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentReplySurveyComponent } from './parent-reply-survey.component';

describe('ParentReplySurveyComponent', () => {
  let component: ParentReplySurveyComponent;
  let fixture: ComponentFixture<ParentReplySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentReplySurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentReplySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
