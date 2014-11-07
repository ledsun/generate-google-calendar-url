(function() {
  var moment = typeof module === 'object' ? require('moment') : window.moment,
    BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE',
    toParameter = function(options, propertyName, alternativeName) {
      if (!options[propertyName]) return '';

      return '&' +
        (alternativeName || propertyName) +
        '=' +
        encodeURIComponent(options[propertyName]);
    },
    toMoment = function(options) {
      return moment(moment(options.date, 'YYYY/MM/DD'));
    },
    toDates = function(options) {
      if (!options.date) return '';

      var moment = toMoment(options);

      return moment.isValid() ?
        '&dates=' + moment.format('YYYYMMDD') + '/' + moment.add(1, 'd').format('YYYYMMDD') :
        '';
    },
    generateUrl = function(options) {
      options = options || {};

      return BASE_URL +
        toParameter(options, 'title', 'text') +
        toParameter(options, 'location') +
        toDates(options);
    };

  if (typeof module === 'object') {
    // CommonJS
    module.exports = generateUrl;
  } else {
    // Browser global.
    window.generateUrl = generateUrl;
  }
})();
