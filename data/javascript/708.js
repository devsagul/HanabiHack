'use strict';

describe('Constants File: Constants', function () {

  // load the service's module
  beforeEach(module('sportsStoreApp'));

  // instantiate service
  var maxItemsPerPage;
  beforeEach(inject(function (_maxItemsPerPage_) {
    maxItemsPerPage = _maxItemsPerPage_;
  }));

  it('maxItemsPerPage should exist', function () {
    expect(!!maxItemsPerPage).toBe(true);
  });

});
