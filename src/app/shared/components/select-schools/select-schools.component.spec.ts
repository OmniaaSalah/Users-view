import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchoolsComponent } from './select-schools.component';

describe('SelectSchoolsComponent', () => {
  let component: SelectSchoolsComponent;
  let fixture: ComponentFixture<SelectSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSchoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
