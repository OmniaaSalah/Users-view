import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOperationsDropdownComponent } from './student-operations-dropdown.component';

describe('StudentOperationsDropdownComponent', () => {
  let component: StudentOperationsDropdownComponent;
  let fixture: ComponentFixture<StudentOperationsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOperationsDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOperationsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
