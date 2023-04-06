import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsSettingComponent } from './notifications-setting.component';

describe('NotificationsSettingComponent', () => {
  let component: NotificationsSettingComponent;
  let fixture: ComponentFixture<NotificationsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
