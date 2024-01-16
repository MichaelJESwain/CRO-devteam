function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
   
    function check() {
      if (window && document.querySelector('.GlpPage') &&   document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]') && document.querySelectorAll('[data-testid="Recommendations-component-glp_rec_injection1"]').length > 1 && /* document.querySelector('[data-testid="DynamicModule-component"]').parentElement !== undefined && */
document.querySelector('[data-testid="ProductTile-component"] [data-testid="Skeleton-component"]') == null
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