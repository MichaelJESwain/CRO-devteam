function callbackFn(activate, options) {
    const utils = window.optimizely.get('utils');
    utils
      .waitForElement('li[data-category-id="TH_KIDSNEW"]')
      .then(function (kidsButton) {
        kidsButton.addEventListener('click', () => {
          activate();
        });
      });
    // If kids menu is already active then also activate
    utils
      .waitForElement('li[data-category-id="TH_KIDSNEW"][class*="active"]')
      .then(function () {
        activate();
      });
  }

// URL Match:
// .*(uk|de|nl|fr|it|es|pl)\.tommy\.com.*