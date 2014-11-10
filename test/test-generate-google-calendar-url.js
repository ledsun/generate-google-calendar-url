var assert = require('power-assert'),
  generateUrl = require('../generate-google-calendar-url'),
  BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE';

describe('generate url', function() {
  it('given no parameter, return BASE_URL', function() {
    assert.equal(generateUrl(), BASE_URL)
  })

  it('given two parameters, work well', function() {
    assert.equal(generateUrl({
      title: 'new event',
      location: 'somewhere'
    }), BASE_URL + '&text=new%20event&location=somewhere')
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
  })
});
