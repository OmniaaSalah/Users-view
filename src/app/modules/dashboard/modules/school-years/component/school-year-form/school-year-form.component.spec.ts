import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolYearFormComponent } from './school-year-form.component';

describe('SchoolYearFormComponent', () => {
  let component: SchoolYearFormComponent;
  let fixture: ComponentFixture<SchoolYearFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolYearFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolYearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
