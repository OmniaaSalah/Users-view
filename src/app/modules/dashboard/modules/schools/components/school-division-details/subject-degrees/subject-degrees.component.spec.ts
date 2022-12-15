import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDegreesComponent } from './subject-degrees.component';

describe('SubjectDegreesComponent', () => {
  let component: SubjectDegreesComponent;
  let fixture: ComponentFixture<SubjectDegreesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDegreesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDegreesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
