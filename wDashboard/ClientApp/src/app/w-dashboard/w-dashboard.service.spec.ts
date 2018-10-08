import { TestBed, inject } from '@angular/core/testing';

import { WDashboardService } from './w-dashboard.service';

describe('WDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WDashboardService]
    });
  });

  it('should be created', inject([WDashboardService], (service: WDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
