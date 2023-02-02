import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFilesComponent } from './survey-files.component';

describe('SurveyFilesComponent', () => {
  let component: SurveyFilesComponent;
  let fixture: ComponentFixture<SurveyFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
