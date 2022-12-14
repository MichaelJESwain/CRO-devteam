function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
  
    function check() {
      if (
        window &&
        window.digitalData &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.storeLanguage &&
        window.digitalData.site.attributes.storeLanguage[0] &&
        window.digitalData.site.attributes.storeLanguage[1] &&
        window.digitalData.site.attributes.siteDeviceVersion &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        document.querySelector('div[class*="header__wishlist-count_"]') &&
        window.digitalData.page.category.pageType === 'wishlistpage' &&
        document.querySelector('.wishlist__landing--container') &&
        document.querySelector('.wishlist-item') &&
        document.querySelector('.sl-sign-in-or-register') &&
        document.querySelectorAll('.wishlist-item').length > 0    
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    var interval = setInterval(function () {
      var t2 = new Date().getTime();
      dif = (t2 - t1) / 1000;
  
      if (dif > maxSeconds) {
        clearInterval(interval);
      } else if (check()) {
        clearInterval(interval);
        activate();
      }
    }, 100);
  }