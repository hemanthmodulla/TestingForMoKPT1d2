import { TestBed } from '@angular/core/testing';

import { WidgetCommunicationService } from './widget-communication.service';

describe('WidgetCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetCommunicationService = TestBed.get(WidgetCommunicationService);
    expect(service).toBeTruthy();
  });
});
