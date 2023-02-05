import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRequestsComponent } from './child-requests.component';

describe('ChildRequestsComponent', () => {
  let component: ChildRequestsComponent;
  let fixture: ComponentFixture<ChildRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
