import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EapCalculatorComponent } from './eap-calculator.component';

describe('EapCalculatorComponent', () => {
  let component: EapCalculatorComponent;
  let fixture: ComponentFixture<EapCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EapCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EapCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
