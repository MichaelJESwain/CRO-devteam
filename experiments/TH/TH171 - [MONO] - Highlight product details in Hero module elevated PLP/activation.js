function callbackFn(activate, options) {
    var t1 = new Date().getTime()
    var dif = 0
    var maxSeconds = 5
  
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
        window.digitalData.page.category.pageType === 'plp' &&
        (window.digitalData.page.category.primaryCategoryId === 'th_women' || 
        window.digitalData.page.category.primaryCategoryId === 'th_men') &&
        document.querySelector('[data-testid="HeroModule"]')         
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
        //console.log("my page is working")
        activate();
      }
    }, 100);

  }