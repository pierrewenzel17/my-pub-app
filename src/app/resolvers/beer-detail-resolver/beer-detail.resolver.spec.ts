import { TestBed } from '@angular/core/testing';

import { BeerDetailResolver } from './beer-detail.resolver';

describe('BeerDetailResolver', () => {
  let resolver: BeerDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BeerDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
