function callbackFn(activate, options) {
  const utils = window.optimizely.get('utils');

  utils.waitUntil(function() {
      return document.querySelector('.THFitGuide');
    }).then(function() {
      activate();
    });
}
