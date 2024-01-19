function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;

    function check() {
      if (
        window &&
        document.querySelector('[data-testid="pdp-main"]') &&
        document.querySelector('[data-testid="pdpActionButton-addToBag-pvh-button"]') &&
        document.querySelector('[class*=AddedToBagPopup_AddedToBagWrapper]') &&
        window.location.pathname.split('/')[1] !== 'EN'
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
