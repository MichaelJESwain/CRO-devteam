function callbackFn(activate, options) {
    var t1 = new Date().getTime();
    var dif = 0;
    var maxSeconds = 5;
    
    function checkPlp() {
      const device = window.digitalData.site.attributes.siteDeviceVersion;
  
      if (device === 'desktop') {
        if (document.querySelector('.mega-menu--wrapper')) {
          return true;
        }
      } else if (device === 'mobile') {
        return false;
      }
    }
  
    function checkPdp() {
      const device = window.digitalData.site.attributes.siteDeviceVersion;
  
      if (device === 'desktop') {
        if (
          document.querySelector('.mega-menu--wrapper') &&
          document.querySelector('.colour-swatch-selectors__selectors')
        ) {
          return true;
        }
      } else if (device === 'mobile') {
        return false;
      }
    }
  
    function isKid() {
      if (
        window.digitalData.page.pageInfo &&
        window.digitalData.page.pageInfo.pageGender &&
        (window.digitalData.page.pageInfo.pageGender === 'kids' || 
        document.querySelector("[class='kids --active'], [class='bambini --active'],[class='kinderen --active'], [class='kinder --active'],[class='enfants --active'], [class='dzieci --active'],[class='niños --active']"))
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    function checkGlp() {
      if (document.querySelector('[data-testid="module-5-teaser-title"]')) {
        return true;
      }
    }
  
    function checkPerPage(pageType) {
      if (pageType === 'pdp') {
        return checkPdp();
      }
  
      if (pageType === 'plp') {
        return checkPlp();
      }
  
      if (pageType === 'glp') {
        return checkGlp();
      }
    }
  
    function check() {
      if (
        window &&
        window.digitalData &&
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.pageType &&
        window.digitalData.site &&
        window.digitalData.site.attributes &&
        window.digitalData.site.attributes.siteDeviceVersion &&
        window.digitalData.page.pageInfo &&
        isKid()
      ) {
        return checkPerPage(window.digitalData.page.category.pageType);
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