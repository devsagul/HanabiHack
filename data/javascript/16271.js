'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/events', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/events');
      });
  });


  describe('Event list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/events');
    });


    it('should filter the event list as a user types into the search box', function() {

      var phoneList = element.all(by.repeater('event in events'));
      var query = element(by.model('query'));

      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(phoneList.count()).toBe(8);
    });


    it('should be possible to control event order via the drop down select box', function() {

      var phoneNameColumn = element.all(by.repeater('event in events').column('event.name'));
      var query = element(by.model('query'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });


    it('should render event specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element.all(by.css('.events li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/events/nexus-s');
      });
    });
  });


  describe('Event detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/events/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(element(by.binding('event.name')).getText()).toBe('Nexus S');
    });


    it('should display the first event image as the main event image', function() {
      expect(element(by.css('img.event.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.event-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.event.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

      element(by.css('.event-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.event.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });
  });
});
