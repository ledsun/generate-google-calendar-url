;
! function(undefined) {
  var generateUrl = function(options) {
    return 'http://www.google.com/calendar/event?action=TEMPLATE' + (options ? '&text=' + encodeURIComponent(options.title) : '');
  };

  if (typeof module === 'object') {
    // CommonJS
    module.exports = generateUrl;
  } else {
    // Browser global.
    window.generateUrl = generateUrl;
  }
}();
