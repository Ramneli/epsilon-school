import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHomeworksComponent } from './show-homeworks.component';

describe('ShowHomeworksComponent', () => {
  let component: ShowHomeworksComponent;
  let fixture: ComponentFixture<ShowHomeworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHomeworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHomeworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
