import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionSubjectsComponent } from './division-subjects.component';

describe('DivisionSubjectsComponent', () => {
  let component: DivisionSubjectsComponent;
  let fixture: ComponentFixture<DivisionSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
