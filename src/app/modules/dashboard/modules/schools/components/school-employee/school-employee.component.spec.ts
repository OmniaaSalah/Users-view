import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEmployeeComponent } from './school-employee.component';

describe('SchoolEmployeeComponent', () => {
  let component: SchoolEmployeeComponent;
  let fixture: ComponentFixture<SchoolEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
