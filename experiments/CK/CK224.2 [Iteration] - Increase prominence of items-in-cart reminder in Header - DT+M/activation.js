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
        window.digitalData.cart &&
        window.digitalData.cart.item &&
        window.digitalData.cart.item.length > 0 &&
        document.querySelector('[data-testid="MiniBagNotification-component"]') &&
        document.querySelector('[class*="mini_bag_notification_mb_notification_imageContainer__"] img') &&
        document.querySelector('[class*="PageNotification_action__"]') &&
        document.querySelector('[data-test-id="notification-view-sb"]')
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