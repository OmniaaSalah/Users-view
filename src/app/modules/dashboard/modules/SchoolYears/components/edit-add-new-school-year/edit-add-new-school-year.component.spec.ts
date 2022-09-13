import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddNewSchoolYearComponent } from './edit-add-new-school-year.component';

describe('EditAddNewSchoolYearComponent', () => {
  let component: EditAddNewSchoolYearComponent;
  let fixture: ComponentFixture<EditAddNewSchoolYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddNewSchoolYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddNewSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
