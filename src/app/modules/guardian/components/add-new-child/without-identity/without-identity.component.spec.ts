import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutIdentityComponent } from './without-identity.component';

describe('WithoutIdentityComponent', () => {
  let component: WithoutIdentityComponent;
  let fixture: ComponentFixture<WithoutIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
