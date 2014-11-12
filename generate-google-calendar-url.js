(function() {
  var moment = typeof module === 'object' ? require('moment') : window.moment,
    BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE',
    MAX_LENGTH = 512,
    toMoment = function(options) {
      return moment(moment(options.date, 'YYYY/MM/DD'));
    },
    toAllDay = function(options) {
      if (!options.date) return '';

      var moment = toMoment(options);

      return moment.isValid() ?
        '&dates=' + moment.format('YYYYMMDD') + '/' + moment.add(1, 'd').format('YYYYMMDD') :
        '';
    },
    toIsoHour = function(date) {
      return moment(date).utc().format('YYYYMMDDTHHmmss') + 'Z';
    },
    toHour = function(options) {
      if (!(options.start instanceof Date) || !(options.end instanceof Date)) return '';

      return '&dates=' + toIsoHour(options.start) + '/' + toIsoHour(options.end);
    },
    toDatesParameter = function(options) {
      return options.start && options.end ? toHour(options) :
        options.date ? toAllDay(options) :
        '';
    },
    toStringParameter = function(options, propertyName, alternativeName) {
      if (!options[propertyName]) return '';

      return '&' +
        (alternativeName || propertyName) +
        '=' +
        encodeURIComponent(options[propertyName].substr(0, MAX_LENGTH - 1));
    },
    generateUrl = function(options) {
      options = options || {};

      return BASE_URL +
        toStringParameter(options, 'title', 'text') +
        toStringParameter(options, 'location') +
        toStringParameter(options, 'details') +
        toDatesParameter(options);
    };

  if (typeof module === 'object') {
    // CommonJS
    module.exports = generateUrl;
  } else {
    // Browser global.
    window.generateUrl = generateUrl;
  }
})();
