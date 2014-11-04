;
! function(undefined) {
  var generateUrl = function() {
    return 'http://www.google.com/calendar/event?action=TEMPLATE&text=Title';
  };

  if (typeof module === 'object') {
    // CommonJS
    module.exports = generateUrl;
  } else {
    // Browser global.
    window.generateUrl = generateUrl;
  }
}();
