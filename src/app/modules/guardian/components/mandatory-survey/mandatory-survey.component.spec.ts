import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandatorySurveyComponent } from './mandatory-survey.component';

describe('MandatorySurveyComponent', () => {
  let component: MandatorySurveyComponent;
  let fixture: ComponentFixture<MandatorySurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandatorySurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandatorySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
