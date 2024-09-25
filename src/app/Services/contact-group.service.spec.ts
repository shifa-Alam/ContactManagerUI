import { TestBed } from '@angular/core/testing';

import { ContactGroupService } from './contact-group.service';

describe('ContactGroupService', () => {
  let service: ContactGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
