function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
      
    function check() {
      if (
        window &&
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        window.digitalData.page.category.pageType === 'pdp' &&
        document.querySelector('[class*=ProductSize_IsOos] span')
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