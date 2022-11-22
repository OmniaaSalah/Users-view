import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredAttachmentSettingsComponent } from './required-attachment-settings.component';

describe('RequiredAttachmentSettingsComponent', () => {
  let component: RequiredAttachmentSettingsComponent;
  let fixture: ComponentFixture<RequiredAttachmentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredAttachmentSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredAttachmentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
