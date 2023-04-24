import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentConditionsComponent } from './attachment-conditions.component';

describe('AttachmentConditionsComponent', () => {
  let component: AttachmentConditionsComponent;
  let fixture: ComponentFixture<AttachmentConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
