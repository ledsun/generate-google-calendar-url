var assert = require('power-assert');

describe('generate url', function(){
    it('given minimum parameters', function(){
        var generateUrl = require('../generate-google-calendar-url');
        assert.equal(generateUrl('Title'), 'http://www.google.com/calendar/event?action=TEMPLATE&text=Title');
    });
});
