import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInGracePeriodComponent } from './school-in-grace-period.component';

describe('SchoolInGracePeriodComponent', () => {
  let component: SchoolInGracePeriodComponent;
  let fixture: ComponentFixture<SchoolInGracePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolInGracePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInGracePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
