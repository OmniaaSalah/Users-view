import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRepliesComponent } from './survey-replies.component';

describe('SurveyRepliesComponent', () => {
  let component: SurveyRepliesComponent;
  let fixture: ComponentFixture<SurveyRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyRepliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
