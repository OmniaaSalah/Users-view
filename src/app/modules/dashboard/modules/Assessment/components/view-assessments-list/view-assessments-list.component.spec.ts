import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentsListComponent } from './view-assessments-list.component';

describe('ViewAssessmentsListComponent', () => {
  let component: ViewAssessmentsListComponent;
  let fixture: ComponentFixture<ViewAssessmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssessmentsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssessmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
