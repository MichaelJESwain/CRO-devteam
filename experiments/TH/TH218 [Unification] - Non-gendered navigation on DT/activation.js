function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
  
  function checkPrimaryCategory(){
      if(
        window.digitalData.page.category.primaryCategory &&
        (window.digitalData.page.category.primaryCategory === 'search' ||
        window.digitalData.page.category.primaryCategory === 'tommy jeans')
      ){
        return true;
      } else{
        return false;
      }
    }
  
  function checkPage(){
      if(window.digitalData &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.siteDeviceVersion &&
        window.digitalData.site.attributes.siteDeviceVersion === 'desktop' &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType && 
        (window.digitalData.page.category.pageType === 'homepage' || 
        window.digitalData.page.category.pageType === 'glp' ||
        checkPrimaryCategory()) &&
        document.querySelector('[data-testid="nav-menu-container"]')
        ){
        return true;
      } else {
        return false;
      }
    }
    var interval = setInterval(function () {
      var t2 = new Date().getTime()
      dif = (t2 - t1) / 1000
  
      if (dif > 5) {
        clearInterval(interval);
      } else if (
        window &&
        window.gender === undefined &&
        checkPage() 
         ){
        clearInterval(interval);
        activate();
      }
    }, 100);
}