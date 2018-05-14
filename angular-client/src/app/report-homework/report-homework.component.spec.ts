import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportHomeworkComponent } from './report-homework.component';

describe('ReportHomeworkComponent', () => {
  let component: ReportHomeworkComponent;
  let fixture: ComponentFixture<ReportHomeworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
