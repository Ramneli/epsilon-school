import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeworksComponent } from './add-homeworks.component';

describe('AddHomeworksComponent', () => {
  let component: AddHomeworksComponent;
  let fixture: ComponentFixture<AddHomeworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
