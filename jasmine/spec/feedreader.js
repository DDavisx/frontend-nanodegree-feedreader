$(function() {

  describe('RSS Feeds', function() {

    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('all feeds include a defined URL property', function() {
      allFeeds.forEach(function(element) {
        expect(element.url).toBeDefined();
        expect(element.url).not.toBe('');
        expect(element.url).toBeTruthy();
      });
    });

    it('all feeds include a defined Name property', function() {
      allFeeds.forEach(function(element) {
        expect(element.name).toBeDefined();
        expect(element.name).not.toBe('');
        expect(element.name).toBeTruthy();
      });
    });
  });

  describe('The menu', function() {

    it('is hidden by default.', function() {
      var classes = $('body').attr('class');
      expect(classes).toContain('menu-hidden');
    });

    it('when clicked shows and hides the menu.', function() {
      var body = $('body');
      var menuicon = $('.menu-icon-link');

      menuicon.click();
      var classAttribute = body.attr('class');
      expect(classAttribute).not.toContain('menu-hidden');

      menuicon.click();
      classAttribute = body.attr('class');
      expect(classAttribute).toContain('menu-hidden');
    });
  });

  describe('Initial Entries', function() {
    var empty;
    beforeEach(function(done) {
      var feedLoadCallback = function() {
        done();
      };
      loadFeed(0, feedLoadCallback);
    });

    it("should load feed asynchronously with at least 1 entry", function(done) {
      var emtries = $('.entry');
      expect(emtries.length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function() {

    var feed1;
    var feed2;
    var feed1Count;
    var feed2Count;

    beforeEach(function(done) {
      var newfeedLoadCallback = function() {
        var feed = $('.feed');
        feed2 = feed.html();
        feed2Child = $(feed.children()[0]).html();
        done();
      };
      var InitialfeedLoadCallback = function() {
        var feed = $('.feed');
        feed1 = feed.html();
        feed1Child = $(feed.children()[0]).html();
        loadFeed(1, newfeedLoadCallback);
      };
      loadFeed(0, InitialfeedLoadCallback);
    });

    // This test loads both feeds and grabs the DOM elements. The test then compares the Html.
    it("should load two feeds and change the DOM of the element with class .feed", function(done) {
      expect(feed1).not.toEqual(feed2);
      expect(feed1Child).not.toEqual(feed2Child);
      done();
    });
  });
}());
