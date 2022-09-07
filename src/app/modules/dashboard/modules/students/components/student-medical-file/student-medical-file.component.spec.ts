import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMedicalFileComponent } from './student-medical-file.component';

describe('StudentMedicalFileComponent', () => {
  let component: StudentMedicalFileComponent;
  let fixture: ComponentFixture<StudentMedicalFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMedicalFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMedicalFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
