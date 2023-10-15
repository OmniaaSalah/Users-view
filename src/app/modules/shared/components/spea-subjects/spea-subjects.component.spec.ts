import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeaSubjectsComponent } from './spea-subjects.component';

describe('SpeaSubjectsComponent', () => {
  let component: SpeaSubjectsComponent;
  let fixture: ComponentFixture<SpeaSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeaSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeaSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
