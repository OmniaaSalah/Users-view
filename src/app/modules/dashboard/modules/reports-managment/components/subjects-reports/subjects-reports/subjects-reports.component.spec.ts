import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsReportsComponent } from './subjects-reports.component';

describe('SubjectsReportsComponent', () => {
  let component: SubjectsReportsComponent;
  let fixture: ComponentFixture<SubjectsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
