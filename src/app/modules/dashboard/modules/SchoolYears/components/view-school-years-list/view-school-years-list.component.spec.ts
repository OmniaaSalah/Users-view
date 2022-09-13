import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchoolYearsListComponent } from './view-school-years-list.component';

describe('ViewSchoolYearsListComponent', () => {
  let component: ViewSchoolYearsListComponent;
  let fixture: ComponentFixture<ViewSchoolYearsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSchoolYearsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSchoolYearsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
