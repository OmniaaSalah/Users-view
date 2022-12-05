import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolGradeComponent } from './school-grade.component';

describe('SchoolClassComponent', () => {
  let component: SchoolGradeComponent;
  let fixture: ComponentFixture<SchoolGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
