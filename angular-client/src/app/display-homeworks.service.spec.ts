import { TestBed, inject } from '@angular/core/testing';

import { DisplayHomeworksService } from './display-homeworks.service';

describe('DisplayHomeworksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayHomeworksService]
    });
  });

  it('should be created', inject([DisplayHomeworksService], (service: DisplayHomeworksService) => {
    expect(service).toBeTruthy();
  }));
});
