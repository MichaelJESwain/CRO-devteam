function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;

    function check() {
      if (
        document.querySelector('[data-testid="pdp-main"]') &&
        document.querySelector('[data-testid="ProductAccordions-component"]') &&
        document.querySelector('[data-testid="accordion-content"] div') && document.querySelector('[data-testid="accordion-content"] div').childNodes !== null && document.querySelector('[data-testid="accordion-content"] div').childNodes.length > 0 && document.querySelector('#description-accordion[data-testid="accordion-trigger"]') && window && window.digitalData 
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