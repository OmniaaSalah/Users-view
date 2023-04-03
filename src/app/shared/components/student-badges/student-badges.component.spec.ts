import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBadgesComponent } from './student-badges.component';

describe('StudentBadgesComponent', () => {
  let component: StudentBadgesComponent;
  let fixture: ComponentFixture<StudentBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
