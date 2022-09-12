import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNotificationListComponent } from './view-notification-list.component';

describe('ViewNotificationListComponent', () => {
  let component: ViewNotificationListComponent;
  let fixture: ComponentFixture<ViewNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNotificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
