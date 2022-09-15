import { ComponentFixture, TestBed } from '@angular/core/testing';

import { notificationlistComponent } from './notification-list.component';

describe('ViewNotificationListComponent', () => {
  let component: notificationlistComponent;
  let fixture: ComponentFixture<notificationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ notificationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(notificationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
