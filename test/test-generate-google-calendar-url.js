var assert = require('power-assert');

describe('generate url', function() {
  var generateUrl;

  before(function(done) {
    generateUrl = require('../generate-google-calendar-url');
    done();
  });

  it('given no parameter', function() {
    assert.equal(generateUrl(), 'http://www.google.com/calendar/event?action=TEMPLATE');
  });

  describe('given title parameter', function() {
    it('as multi byte', function() {
      assert.equal(generateUrl({
        title: '新しい予定'
      }), 'http://www.google.com/calendar/event?action=TEMPLATE&text=%E6%96%B0%E3%81%97%E3%81%84%E4%BA%88%E5%AE%9A');
    });

    it('as url', function() {
      assert.equal(generateUrl({
        title: 'http://example.com'
      }), 'http://www.google.com/calendar/event?action=TEMPLATE&text=http%3A%2F%2Fexample.com');
    });
  })

  describe('given location parameter', function() {
    it('as multi byte', function() {
      assert.equal(generateUrl({
        location: 'ここではないどこか'
      }), 'http://www.google.com/calendar/event?action=TEMPLATE&location=%E3%81%93%E3%81%93%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A9%E3%81%93%E3%81%8B');
    });

    it('as url', function() {
      assert.equal(generateUrl({
        location: 'http://example.com'
      }), 'http://www.google.com/calendar/event?action=TEMPLATE&location=http%3A%2F%2Fexample.com');
    });
  })

  it('given two parameters', function() {
    assert.equal(generateUrl({
      title: 'new event',
      location: 'somewhere'
  }), 'http://www.google.com/calendar/event?action=TEMPLATE&text=new%20event&location=somewhere');
  })
});
