import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardeStudentsComponent } from './garde-students.component';

describe('GardeStudentsComponent', () => {
  let component: GardeStudentsComponent;
  let fixture: ComponentFixture<GardeStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardeStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardeStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
