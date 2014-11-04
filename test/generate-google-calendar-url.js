var assert = require('power-assert');

describe('generate url', function() {
  var generateUrl;

  before(function(done) {
    generateUrl = require('../lib/generate-google-calendar-url');
    done();
  });

  it('given no parameter', function() {
    assert.equal(generateUrl(), 'http://www.google.com/calendar/event?action=TEMPLATE');
  });

  it('given multi byte title', function() {
    assert.equal(generateUrl({
      title: '新しい予定'
    }), 'http://www.google.com/calendar/event?action=TEMPLATE&text=%E6%96%B0%E3%81%97%E3%81%84%E4%BA%88%E5%AE%9A');
  });

  it('given url title', function() {
    assert.equal(generateUrl({
      title: 'http://example.com'
    }), 'http://www.google.com/calendar/event?action=TEMPLATE&text=http%3A%2F%2Fexample.com');
  });
});
