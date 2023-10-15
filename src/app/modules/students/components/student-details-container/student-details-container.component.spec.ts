import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsContainerComponent } from './student-details-container.component';

describe('StudentDetailsComponent', () => {
  let component: StudentDetailsContainerComponent;
  let fixture: ComponentFixture<StudentDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
