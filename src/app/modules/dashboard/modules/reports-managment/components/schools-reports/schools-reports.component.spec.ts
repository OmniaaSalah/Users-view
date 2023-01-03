import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsReportsComponent } from './schools-reports.component';

describe('SchoolsReportsComponent', () => {
  let component: SchoolsReportsComponent;
  let fixture: ComponentFixture<SchoolsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
