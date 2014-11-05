;
! function(undefined) {
  var BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE',
    toParameter = function(options, propertyName, alternativeName) {
      if (!options[propertyName]) return '';

      return '&' +
        (alternativeName || propertyName) +
        '=' +
        encodeURIComponent(options[propertyName]);
    },
    generateUrl = function(options) {
      options = options || {};
      return BASE_URL +
        toParameter(options, 'title', 'text') +
        toParameter(options, 'location');
    };

  if (typeof module === 'object') {
    // CommonJS
    module.exports = generateUrl;
  } else {
    // Browser global.
    window.generateUrl = generateUrl;
  }
}();
