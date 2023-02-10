import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithIdentityComponent } from './with-identity.component';

describe('ReigsterWithNationalityComponent', () => {
  let component: WithIdentityComponent;
  let fixture: ComponentFixture<WithIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
