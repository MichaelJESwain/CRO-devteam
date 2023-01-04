function callbackFn(activate, options) {
    var utils = window['optimizely'].get('utils');
  
    utils.waitForElement('.csr-link[href="/kids"], .csr-link[href="/kinder"], .csr-link[href="/kinderen"], .csr-link[href="/enfant"], .csr-link[href="/abbigliamento-bambini"], .csr-link[href="/ropa-infantil"], .csr-link[href="/dzieci"]').then(function (kidsTab) {
      kidsTab.addEventListener('click', () => {
        activate();
      });
    });
    utils
      .waitForElement(
        '.mega-menu__first-level .kids.--active, .mega-menu__first-level .kinderen.--active, .mega-menu__first-level .kinder.--active, .mega-menu__first-level .enfants.--active, .mega-menu__first-level .bambini.--active, .mega-menu__first-level .niños.--active, .mega-menu__first-level .dzieci.--active'
      )
      .then(function () {
        activate();
      });
}

// URL Match:
// .*calvinklein\.(co\.uk|de|nl|fr|it|es|pl).*