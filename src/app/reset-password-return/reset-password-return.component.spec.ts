import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetPasswordReturnComponent} from './reset-password-return.component';

describe('ResetPasswordReturnComponent', () => {
  let component: ResetPasswordReturnComponent;
  let fixture: ComponentFixture<ResetPasswordReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordReturnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
