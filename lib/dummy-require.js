window.require = function(modeluName) {
  if (modeluName === 'power-assert') return window.assert;
  if (modeluName === '../lib/generate-google-calendar-url') return window.generateUrl;
}
