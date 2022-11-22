import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolRecordComponent } from './school-record.component';

describe('SchoolRecordComponent', () => {
  let component: SchoolRecordComponent;
  let fixture: ComponentFixture<SchoolRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
