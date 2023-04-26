import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProhibitedStatusComponent } from './student-prohibited-status.component';

describe('StudentProhibitedStatusComponent', () => {
  let component: StudentProhibitedStatusComponent;
  let fixture: ComponentFixture<StudentProhibitedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProhibitedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProhibitedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
