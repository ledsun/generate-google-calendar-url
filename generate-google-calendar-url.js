(function() {
  var BASE_URL = 'http://www.google.com/calendar/event?action=TEMPLATE',
    MAX_LENGTH = 512,
    toAllDay = function(options) {
      if (typeof options.date !== 'string') return '';

      var parts = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(options.date);
      if (!parts) return '';

      try {
        var date = Temporal.PlainDate.from({
          year: Number(parts[1]),
          month: Number(parts[2]),
          day: Number(parts[3])
        }, { overflow: 'reject' });

        return '&dates=' + date.toString().replace(/-/g, '') + '/' +
          date.add({ days: 1 }).toString().replace(/-/g, '');
      } catch (error) {
        if (error instanceof RangeError) return '';
        throw error;
      }
    },
    toIsoHour = function(date) {
      return Temporal.Instant.fromEpochMilliseconds(date.getTime())
        .toString({ smallestUnit: 'second' }).replace(/[-:]/g, '');
    },
    toHour = function(options) {
      if (!(options.start instanceof Date) || !(options.end instanceof Date)) return '';
      if (!Number.isFinite(options.start.getTime()) || !Number.isFinite(options.end.getTime())) return '';

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
