import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolLocationComponent } from './school-location.component';

describe('SchoolLocationComponent', () => {
  let component: SchoolLocationComponent;
  let fixture: ComponentFixture<SchoolLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
