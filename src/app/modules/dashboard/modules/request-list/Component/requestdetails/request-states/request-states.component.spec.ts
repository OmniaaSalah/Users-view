import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatesComponent } from './request-states.component';

describe('RequestStatesComponent', () => {
  let component: RequestStatesComponent;
  let fixture: ComponentFixture<RequestStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestStatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
