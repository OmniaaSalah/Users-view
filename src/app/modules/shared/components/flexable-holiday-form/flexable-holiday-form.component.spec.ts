import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexableHolidayFormComponent } from './flexable-holiday-form.component';

describe('FlexableHolidayFormComponent', () => {
  let component: FlexableHolidayFormComponent;
  let fixture: ComponentFixture<FlexableHolidayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexableHolidayFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexableHolidayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
