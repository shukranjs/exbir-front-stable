import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommercialComponent} from './commercial.component';

describe('CommericalComponent', () => {
  let component: CommercialComponent;
  let fixture: ComponentFixture<CommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommercialComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
