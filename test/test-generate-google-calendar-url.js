var assert = require('assert'),
  generateUrl = require('../generate-google-calendar-url'),
  BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE',
  MAX_STRING = (new Array(512)).join("x")

describe('generate url', function() {
  it('given no parameter, return BASE_URL', function() {
    assert.equal(generateUrl(), BASE_URL)
  })

  describe('given multi parameters', function() {
    it('as full parameters, work well', function() {
      assert.equal(generateUrl({
        title: 'new event',
        location: 'somewhere',
        start: new Date(2014, 10, 10, 12),
        end: new Date(2014, 10, 10, 14),
        details: 'details'
      }), BASE_URL + '&text=new%20event&location=somewhere&details=details&dates=20141110T030000Z/20141110T050000Z')
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

    ;[
      ['2024/02/29', '20240229/20240301'],
      ['2023/02/28', '20230228/20230301'],
      ['2024/12/31', '20241231/20250101'],
      ['2024/1/9', '20240109/20240110']
    ].forEach(function(example) {
      it('advances the all-day end for ' + example[0], function() {
        assert.equal(generateUrl({ date: example[0] }), BASE_URL + '&dates=' + example[1])
      })
    })

    ;['2023/02/29', '2024/13/01', '2024/00/01', '2024/01/00', 'invalid', '2024/01/01extra', {}].forEach(function(date) {
      it('ignores invalid all-day input ' + JSON.stringify(date), function() {
        assert.equal(generateUrl({ date: date }), BASE_URL)
      })
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
        end: new Date
      }), BASE_URL)
    })

    it('as not date, ignore', function() {
      assert.equal(generateUrl({
        start: 'a',
        end: {}
      }), BASE_URL)
    })

    it('converts offsets to UTC and truncates milliseconds', function() {
      assert.equal(generateUrl({
        start: new Date('2024-01-01T00:30:45.999+09:00'),
        end: new Date('2024-01-01T01:30:45.123+09:00')
      }), BASE_URL + '&dates=20231231T153045Z/20231231T163045Z')
    })

    it('ignores invalid Date objects', function() {
      assert.equal(generateUrl({ start: new Date(NaN), end: new Date() }), BASE_URL)
      assert.equal(generateUrl({ start: new Date(), end: new Date(NaN) }), BASE_URL)
    })
  })

  describe('given location parameter, encode as url-encode', function() {
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

  describe('given details parameter, encode as url-encode', function() {
    it('as multi byte', function() {
      assert.equal(generateUrl({
        details: 'ここではないどこか'
      }), BASE_URL + '&details=%E3%81%93%E3%81%93%E3%81%A7%E3%81%AF%E3%81%AA%E3%81%84%E3%81%A9%E3%81%93%E3%81%8B')
    })

    it('as url', function() {
      assert.equal(generateUrl({
        details: 'http://example.com'
      }), BASE_URL + '&details=http%3A%2F%2Fexample.com')
    })

    it('as empty, ignore', function() {
      assert.equal(generateUrl({
        details: ''
      }), BASE_URL)
    })

    it('as long string, cut off', function() {
      assert.equal(generateUrl({
        details: MAX_STRING + 'a'
      }), BASE_URL + '&details=' + MAX_STRING)
    })
  })
})
