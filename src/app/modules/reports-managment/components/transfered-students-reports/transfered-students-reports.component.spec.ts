import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferedStudentsReportsComponent } from './transfered-students-reports.component';

describe('TransferedStudentsReportsComponent', () => {
  let component: TransferedStudentsReportsComponent;
  let fixture: ComponentFixture<TransferedStudentsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferedStudentsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferedStudentsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
