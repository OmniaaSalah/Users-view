import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRateComponent } from './students-rate.component';

describe('StudentsRateComponent', () => {
  let component: StudentsRateComponent;
  let fixture: ComponentFixture<StudentsRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
