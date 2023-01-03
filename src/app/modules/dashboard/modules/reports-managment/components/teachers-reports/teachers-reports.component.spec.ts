import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersReportsComponent } from './teachers-reports.component';

describe('TeachersReportsComponent', () => {
  let component: TeachersReportsComponent;
  let fixture: ComponentFixture<TeachersReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
