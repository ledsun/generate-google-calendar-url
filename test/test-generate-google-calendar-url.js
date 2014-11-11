var assert = require('power-assert'),
  generateUrl = require('../generate-google-calendar-url'),
  BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE',
  MAX_STRING = (new Array(512)).join("x")

describe('generate url', function() {
  it('given no parameter, return BASE_URL', function() {
    assert.equal(generateUrl(), BASE_URL)
  })

  describe('given multi parameters', function() {
    it('as title and location, work well', function() {
      assert.equal(generateUrl({
        title: 'new event',
        location: 'somewhere'
      }), BASE_URL + '&text=new%20event&location=somewhere')
    })

    it('as date and start and end, prefer start and end', function() {
      assert.equal(generateUrl({
        date: '2014/11/07',
        start: new Date(2014, 10, 10, 12),
        end: new Date(2014, 10, 10, 14)
      }), BASE_URL + '&dates=20141110T030000Z/20141110T050000Z')
    })
  })

  describe('given title parameter, encode to "text" as url-encode', function() {
    it('as multi byte', function() {
      assert.equal(generateUrl({
        title: '新しい予定'
      }), BASE_URL + '&text=%E6%96%B0%E3%81%97%E3%81%84%E4%BA%88%E5%AE%9A')
    })

    it('as url', function() {
      assert.equal(generateUrl({
        title: 'http://example.com'
      }), BASE_URL + '&text=http%3A%2F%2Fexample.com')
    })

    it('as empty, ignore', function() {
      assert.equal(generateUrl({
        title: ''
      }), BASE_URL)
    })

    it('as long string, cut off', function() {
      assert.equal(generateUrl({
        title: MAX_STRING + 'a'
      }), BASE_URL + '&text=' + MAX_STRING)
    })
  })

  describe('given date parameter, encode to "dates"', function() {
    it('as all day', function() {
      assert.equal(generateUrl({
        date: '2014/11/07'
      }), BASE_URL + '&dates=20141107/20141108')
    })

    it('as invaid date, ignore', function() {
      assert.equal(generateUrl({
        date: '2014/11/31'
      }), BASE_URL)
    })
  })

  describe('given start and end parameter, encode to "dates"', function() {
    it('as two hours', function() {
      assert.equal(generateUrl({
        start: new Date(2014, 10, 10, 12),
        end: new Date(2014, 10, 10, 14)
      }), BASE_URL + '&dates=20141110T030000Z/20141110T050000Z')
    })

    it('as only start, ignore', function() {
      assert.equal(generateUrl({
        start: new Date
      }), BASE_URL)
    })

    it('as only end, ignore', function() {
      assert.equal(generateUrl({
        start: new Date
      }), BASE_URL)
    })

    it('as not date, ignore', function() {
      assert.equal(generateUrl({
        start: 'a',
        end: {}
      }), BASE_URL)
    })
  })

  describe('given location parameter, encode to url-encode', function() {
    it('as multi byte', function() {
      assert.equal(generateUrl({
        location: 'ここではないどこか'
      }), BASE_URL + '&location=%E3%81%93%E3%81%93%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A9%E3%81%93%E3%81%8B')
    })

    it('as url', function() {
      assert.equal(generateUrl({
        location: 'http://example.com'
      }), BASE_URL + '&location=http%3A%2F%2Fexample.com')
    })

    it('as empty, ignore', function() {
      assert.equal(generateUrl({
        location: ''
      }), BASE_URL)
    })

    it('as long string, cut off', function() {
      assert.equal(generateUrl({
        location: MAX_STRING + 'a'
      }), BASE_URL + '&location=' + MAX_STRING)
    })
  })
});
