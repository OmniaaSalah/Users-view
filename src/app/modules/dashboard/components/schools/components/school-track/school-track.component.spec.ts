import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolTrackComponent } from './school-track.component';

describe('SchoolTrackComponent', () => {
  let component: SchoolTrackComponent;
  let fixture: ComponentFixture<SchoolTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolTrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
