import {inject, TestBed} from '@angular/core/testing';

import {TrackDetailsGuard} from './track-details.guard';

describe('TrackDetailsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackDetailsGuard]
    });
  });

  it('should ...', inject([TrackDetailsGuard], (guard: TrackDetailsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
