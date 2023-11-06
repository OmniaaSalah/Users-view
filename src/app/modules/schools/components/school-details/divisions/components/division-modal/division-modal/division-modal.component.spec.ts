import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionModalComponent } from './division-modal.component';

describe('DivisionModalComponent', () => {
  let component: DivisionModalComponent;
  let fixture: ComponentFixture<DivisionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
