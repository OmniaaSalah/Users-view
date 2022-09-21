import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceRecordsComponent } from './absence-records.component';

describe('AbsenceRecordsComponent', () => {
  let component: AbsenceRecordsComponent;
  let fixture: ComponentFixture<AbsenceRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
