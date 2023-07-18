window.require = function(moduleName) {
  if (moduleName === 'power-assert') return window.assert;
  if (moduleName === '../generate-google-calendar-url') return window.generateUrl;
}
