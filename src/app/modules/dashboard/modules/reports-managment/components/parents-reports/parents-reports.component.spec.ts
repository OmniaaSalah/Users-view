import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsReportsComponent } from './parents-reports.component';

describe('ParentsReportsComponent', () => {
  let component: ParentsReportsComponent;
  let fixture: ComponentFixture<ParentsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
