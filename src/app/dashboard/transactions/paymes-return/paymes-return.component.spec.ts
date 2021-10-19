import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymesReturnComponent} from './paymes-return.component';

describe('PaymesReturnComponent', () => {
  let component: PaymesReturnComponent;
  let fixture: ComponentFixture<PaymesReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymesReturnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
